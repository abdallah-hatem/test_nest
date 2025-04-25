import {
  Injectable,
  NotFoundException,
  Inject,
  ConflictException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { GetUserDto } from './dto/get-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserMapper } from './mappers/user.mapper';
import { IUserRepository } from './repositories/user.repository.interface';
import { USER_REPOSITORY_TOKEN } from './repositories/user.repository.token';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly SALT_ROUNDS = 10;

  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  async create(createUserDto: CreateUserDto): Promise<GetUserDto> {
    try {
      const hashedPassword = await this.hashPassword(createUserDto.password);
      const user = await this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });
      return UserMapper.toDto(user);
    } catch (error) {
      if (
        error.code === '23505' &&
        error.constraint === 'UQ_97672ac88f789774dd47f7c8be3'
      ) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async findAll(page?: number, perPage?: number): Promise<any> {
    const paginatedResult = await this.userRepository.findAll(page, perPage);
    
    return {
      ...paginatedResult,
      data: paginatedResult.data.map(user => UserMapper.toDto(user))
    };
  }

  async findOne(id: string): Promise<GetUserDto> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return UserMapper.toDto(user);
  }

  async update(id: string, updateUserDto: Partial<User>): Promise<GetUserDto> {
    if (updateUserDto.password) {
      updateUserDto.password = await this.hashPassword(updateUserDto.password);
    }
    const savedUser = await this.userRepository.update(id, updateUserDto);
    return UserMapper.toDto(savedUser);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}
