import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/types/interfaces';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserPassword } from './dto/update-user-password.dto';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.quard';

@ApiTags('USERS')
@Controller('/user')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(200)
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @HttpCode(200)
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.getUser(id);
    return new UserEntity(user);
  }

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 201 })
  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async createUser(@Body() userDto: CreateUserDTO) {
    const user = await this.usersService.createUser(userDto);
    return new UserEntity(user);
  }

  @ApiOperation({ summary: 'Update user password' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async updatePassword(
    @Param('id') id: string,
    @Body() userDto: UpdateUserPassword,
  ) {
    const user = await this.usersService.updateUserPassword(id, userDto);
    return new UserEntity(user);
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({ status: 204 })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
