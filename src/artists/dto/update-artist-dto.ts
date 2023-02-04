import { IsString, IsBoolean, IsDefined, IsNotEmpty } from 'class-validator';
import {
  ERROR_EMPTY,
  ERROR_STRING,
  ERROR_REQUIRED,
} from 'src/helpers/constants';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateArtistDTO {
  @ApiProperty({ example: 'John Lennon', description: 'name' })
  @IsDefined({ message: ERROR_REQUIRED })
  @IsNotEmpty({ message: ERROR_EMPTY })
  @IsString({ message: ERROR_STRING })
  name: string;
  @ApiProperty({ example: 'false', description: 'grammy' })
  @IsDefined({ message: ERROR_REQUIRED })
  @IsNotEmpty({ message: ERROR_EMPTY })
  @IsBoolean()
  grammy: boolean;
}
