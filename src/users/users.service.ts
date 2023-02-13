import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { users } from 'src/db/db';
import { CreateUserDTO } from './dto/create-user.dto';
import { v4 as uuid4 } from 'uuid';
import { User } from 'src/types/interfaces';
import { validateId } from 'src/helpers/validateId';
import {
  ERROR_INVALID_BODY,
  ERROR_INVALID_ID,
  ERROR_USER_NOT_FOUND,
  ERROR_WRONG_PASSWORD,
} from 'src/helpers/constants';
import { UpdateUserPassword } from './dto/update-user-password.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async getUsers() {
    const users1 = await this.userRepository.find();
    return users1;
  }
  async getUser(id: string) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(ERROR_USER_NOT_FOUND);
    }
    return user;
  }
  async createUser(dto: CreateUserDTO) {
    if (Object.keys(dto).length !== 2) {
      throw new BadRequestException(ERROR_INVALID_BODY);
    }
    const id = uuid4();
    const user: User = {
      id,
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    users.push(user);
    return user;
  }
  async updateUserPassword(id: string, dto: UpdateUserPassword) {
    if (Object.keys(dto).length !== 2) {
      throw new BadRequestException(ERROR_INVALID_BODY);
    }
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(ERROR_USER_NOT_FOUND);
    }
    if (user.password !== dto.oldPassword) {
      throw new ForbiddenException(ERROR_WRONG_PASSWORD);
    }
    const updatedUser = {
      ...user,
      password: dto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };
    users.forEach((u, index) => {
      if (u.id === user.id) {
        users.splice(index, 1, updatedUser);
      }
    });
    return updatedUser;
  }
  async deleteUser(id: string) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(ERROR_USER_NOT_FOUND);
    }
    users.forEach((u, index) => {
      if (u.id === user.id) {
        users.splice(index, 1);
      }
    });
  }
}
