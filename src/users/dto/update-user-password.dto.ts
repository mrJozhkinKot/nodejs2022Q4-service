import { IsString, IsNotEmpty, IsDefined } from 'class-validator';
import {
  ERROR_REQUIRED,
  ERROR_EMPTY,
  ERROR_STRING,
} from 'src/helpers/constants';

export class UpdateUserPassword {
  @IsDefined({ message: ERROR_REQUIRED })
  @IsNotEmpty({ message: ERROR_EMPTY })
  @IsString({ message: ERROR_STRING })
  readonly oldPassword: string;
  @IsDefined({ message: ERROR_REQUIRED })
  @IsNotEmpty({ message: ERROR_EMPTY })
  @IsString({ message: ERROR_STRING })
  readonly newPassword: string;
}
