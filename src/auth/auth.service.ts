import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/users/user.entity';
import {
  ERROR_INVALID_BODY,
  ERROR_WRONG_PASSWORD,
} from 'src/helpers/constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(userDto: CreateUserDTO) {
    if (
      !userDto.login ||
      !userDto.password ||
      typeof userDto.login !== 'string' ||
      typeof userDto.password !== 'string'
    ) {
      throw new BadRequestException(ERROR_INVALID_BODY);
    }
    const salt = Number(process.env.CRYPT_SALT) || 10;
    const hashPassword = await bcrypt.hash(userDto.password, salt);
    return await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
  }

  async login(userDto: CreateUserDTO) {
    if (
      !userDto.login ||
      !userDto.password ||
      typeof userDto.login !== 'string' ||
      typeof userDto.password !== 'string'
    ) {
      throw new BadRequestException(ERROR_INVALID_BODY);
    }
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async generateToken(user: UserEntity) {
    return {
      accessToken: this.jwtService.sign({ login: user.login, id: user.id }),
    };
  }

  private async validateUser(userDto: CreateUserDTO) {
    const user = this.userService.getUserByLogin(userDto);
    const isPasswordCorrect = await bcrypt.compare(
      userDto.password,
      (
        await user
      ).password,
    );
    if (isPasswordCorrect) {
      return user;
    }
    throw new UnauthorizedException(ERROR_WRONG_PASSWORD);
  }
}
