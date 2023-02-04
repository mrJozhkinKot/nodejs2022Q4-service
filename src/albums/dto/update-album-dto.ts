import {
  IsString,
  IsNumber,
  IsDefined,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import {
  ERROR_EMPTY,
  ERROR_STRING,
  ERROR_REQUIRED,
} from 'src/helpers/constants';

export class UpdateAlbumDTO {
  @IsDefined({ message: ERROR_REQUIRED })
  @IsNotEmpty({ message: ERROR_EMPTY })
  @IsString({ message: ERROR_STRING })
  name: string;
  @IsDefined({ message: ERROR_REQUIRED })
  @IsNotEmpty({ message: ERROR_EMPTY })
  @IsNumber()
  year: number;
  @IsOptional()
  @IsString({ message: ERROR_STRING })
  artistId: string | null;
}
