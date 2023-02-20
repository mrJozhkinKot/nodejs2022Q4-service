import { IsString, IsDefined, IsNotEmpty } from 'class-validator';
import {
  ERROR_EMPTY,
  ERROR_REQUIRED,
  ERROR_STRING,
} from 'src/helpers/constants';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({ example: 'user1', description: 'login' })
  @IsDefined({ message: ERROR_REQUIRED })
  @IsNotEmpty({ message: ERROR_EMPTY })
  @IsString({ message: ERROR_STRING })
  readonly login: string;
  @ApiProperty({ example: 'qwerty', description: 'password' })
  @IsDefined({ message: ERROR_REQUIRED })
  @IsNotEmpty({ message: ERROR_EMPTY })
  @IsString({ message: ERROR_STRING })
  readonly password: string;
}
