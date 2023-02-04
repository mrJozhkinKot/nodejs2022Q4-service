import { IsString, IsBoolean, IsDefined, IsNotEmpty } from 'class-validator';
import {
  ERROR_EMPTY,
  ERROR_STRING,
  ERROR_REQUIRED,
} from 'src/helpers/constants';

export class UpdateArtistDTO {
  @IsDefined({ message: ERROR_REQUIRED })
  @IsNotEmpty({ message: ERROR_EMPTY })
  @IsString({ message: ERROR_STRING })
  name: string;
  @IsDefined({ message: ERROR_REQUIRED })
  @IsNotEmpty({ message: ERROR_EMPTY })
  @IsBoolean()
  grammy: boolean;
}
