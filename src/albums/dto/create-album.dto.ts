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
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDTO {
  @ApiProperty({ example: 'The best', description: 'name' })
  @IsDefined({ message: ERROR_REQUIRED })
  @IsNotEmpty({ message: ERROR_EMPTY })
  @IsString({ message: ERROR_STRING })
  name: string;
  @ApiProperty({ example: '1970', description: 'year' })
  @IsDefined({ message: ERROR_REQUIRED })
  @IsNotEmpty({ message: ERROR_EMPTY })
  @IsNumber()
  year: number;
  @ApiProperty({
    example: '457e0933-8810-4f3d-aa8c-1c0256dbe45c',
    description: 'artist id',
  })
  @IsOptional()
  @IsString({ message: ERROR_STRING })
  artistId: string | null;
}
