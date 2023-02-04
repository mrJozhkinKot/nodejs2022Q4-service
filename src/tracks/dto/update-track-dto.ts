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

export class UpdateTrackDTO {
  @IsDefined({ message: ERROR_REQUIRED })
  @IsNotEmpty({ message: ERROR_EMPTY })
  @IsString({ message: ERROR_STRING })
  name: string;
  @IsOptional()
  @IsString({ message: ERROR_STRING })
  artistId: string | null;
  @IsOptional()
  @IsString({ message: ERROR_STRING })
  albumId: string | null;
  @IsDefined({ message: ERROR_REQUIRED })
  @IsNotEmpty({ message: ERROR_EMPTY })
  @IsNumber()
  duration: number;
}
