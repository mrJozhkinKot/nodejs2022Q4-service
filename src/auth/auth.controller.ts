import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('AUTHORIZATION')
@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Sign up' })
  @Post('/signup')
  signup(@Body() userDto: CreateUserDTO) {
    return this.authService.signup(userDto);
  }

  @ApiOperation({ summary: 'Login' })
  @Post('/login')
  login(@Body() userDto: CreateUserDTO) {
    return this.authService.login(userDto);
  }
}
