import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { GetUserDto } from './dto/get-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUtil } from 'src/utils/response.utils';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<GetUserDto> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(@Query('page') page, @Query('per_page') perPage): Promise<any> {
    const users = await this.usersService.findAll(page, perPage);

    return ResponseUtil.handle({
      isPaginated: page && perPage,
      data: users,
      message: 'Fetched users successfully',
      perPage,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<GetUserDto> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<User>,
  ): Promise<GetUserDto> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
