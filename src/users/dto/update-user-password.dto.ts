import { IsString, IsNotEmpty, IsDefined } from 'class-validator';
import {
  ERROR_REQUIRED,
  ERROR_EMPTY,
  ERROR_STRING,
} from 'src/helpers/constants';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserPassword {
  @ApiProperty({ example: 'oldqwerty', description: 'password' })
  @IsDefined({ message: ERROR_REQUIRED })
  @IsNotEmpty({ message: ERROR_EMPTY })
  @IsString({ message: ERROR_STRING })
  readonly oldPassword: string;
  @ApiProperty({ example: 'newqwerty', description: 'password' })
  @IsDefined({ message: ERROR_REQUIRED })
  @IsNotEmpty({ message: ERROR_EMPTY })
  @IsString({ message: ERROR_STRING })
  readonly newPassword: string;
}
