import { IsString, IsDefined, IsNotEmpty } from 'class-validator';
import {
  ERROR_EMPTY,
  ERROR_REQUIRED,
  ERROR_STRING,
} from 'src/helpers/constants';

export class CreateUserDTO {
  @IsDefined({ message: ERROR_REQUIRED })
  @IsNotEmpty({ message: ERROR_EMPTY })
  @IsString({ message: ERROR_STRING })
  readonly login: string;
  @IsDefined({ message: ERROR_REQUIRED })
  @IsNotEmpty({ message: ERROR_EMPTY })
  @IsString({ message: ERROR_STRING })
  readonly password: string;
}
