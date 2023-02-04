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
} from '@nestjs/common';
import { User } from 'src/types/interfaces';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserPassword } from './dto/update-user-password.dto';
import { UsersService } from './users.service';

@Controller('/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  @HttpCode(200)
  async getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async createUser(@Body() userDto: CreateUserDTO) {
    return this.usersService.createUser(userDto);
  }

  @Put(':id')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async updatePassword(
    @Param('id') id: string,
    @Body() userDto: UpdateUserPassword,
  ) {
    return this.usersService.updateUserPassword(id, userDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
