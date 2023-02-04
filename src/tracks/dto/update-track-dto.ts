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

export class UpdateTrackDTO {
  @ApiProperty({ example: 'Yellow Submarine', description: 'name' })
  @IsDefined({ message: ERROR_REQUIRED })
  @IsNotEmpty({ message: ERROR_EMPTY })
  @IsString({ message: ERROR_STRING })
  name: string;
  @ApiProperty({
    example: '457e0933-8810-4f3d-aa8c-1c0256dbe45c',
    description: 'artist Id',
  })
  @IsOptional()
  @IsString({ message: ERROR_STRING })
  @ApiProperty({
    example: '457e0933-8810-4f3d-aa8c-1c0256dbe45c',
    description: 'artist Id',
  })
  artistId: string | null;
  @ApiProperty({
    example: '457e0933-8810-4f3d-aa8c-1c0256dbe45c',
    description: 'album Id',
  })
  @IsOptional()
  @IsString({ message: ERROR_STRING })
  albumId: string | null;
  @ApiProperty({ example: 6, description: 'duration' })
  @IsDefined({ message: ERROR_REQUIRED })
  @IsNotEmpty({ message: ERROR_EMPTY })
  @IsNumber()
  duration: number;
}
