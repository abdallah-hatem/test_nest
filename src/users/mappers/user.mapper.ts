import { User } from '../entities/user.entity';
import { GetUserDto } from '../dto/get-user.dto';

export class UserMapper {
  static toDto(user: User): GetUserDto {
    return new GetUserDto({
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
} 