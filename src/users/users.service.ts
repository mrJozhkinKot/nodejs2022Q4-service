import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
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
    const users = await this.userRepository.find();
    return users;
  }

  async getUser(id: string) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException(ERROR_USER_NOT_FOUND);
    }
    return user;
  }

  async createUser(dto: CreateUserDTO) {
    if (Object.keys(dto).length !== 2) {
      throw new BadRequestException(ERROR_INVALID_BODY);
    }
    const newUser = new UserEntity(dto);
    return await this.userRepository.save(newUser);
  }

  async updateUserPassword(id: string, dto: UpdateUserPassword) {
    if (Object.keys(dto).length !== 2) {
      throw new BadRequestException(ERROR_INVALID_BODY);
    }
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException(ERROR_USER_NOT_FOUND);
    }
    if (user.password !== dto.oldPassword) {
      throw new ForbiddenException(ERROR_WRONG_PASSWORD);
    }
    const updatedUser = { ...user, password: dto.newPassword };
    return await this.userRepository.save(updatedUser);
  }
  async deleteUser(id: string) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException(ERROR_USER_NOT_FOUND);
    }
    return await this.userRepository.delete(user.id);
  }
}
