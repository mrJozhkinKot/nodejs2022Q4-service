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
} from '@nestjs/common';
import { User } from 'src/types/interfaces';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserPassword } from './dto/update-user-password.dto';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';

@Controller('/user')
@UseInterceptors(ClassSerializerInterceptor)
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
    const user = await this.usersService.getUser(id);
    return new UserEntity(user);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async createUser(@Body() userDto: CreateUserDTO) {
    const user = await this.usersService.createUser(userDto);
    return new UserEntity(user);
  }

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

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
