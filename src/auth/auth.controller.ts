import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ResponseUtil } from 'src/utils/response.utils';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.login(loginDto);
    return ResponseUtil.success(user, 'User logged in successfully');
  }

  @Post('register')
  async register(@Body() registerDto: CreateUserDto) {
    const user = await this.authService.register(registerDto);
    return ResponseUtil.created(user, 'User created successfully');
  }
}
