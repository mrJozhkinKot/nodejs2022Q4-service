import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'favorites' })
export class FavoriteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty({
    example: 'a4fa077c-2bb3-450b-adb1-8f9db5cdc9d3',
    description: 'artistId',
  })
  @Column('char', { array: true, default: [] })
  artists: string[];

  @ApiProperty({
    example: 'a4fa077c-2bb3-450b-adb1-8f9db5cdc9d4',
    description: 'albumId',
  })
  @Column('char', { array: true, default: [] })
  albums: string[];

  @ApiProperty({
    example: 'a4fa077c-2bb3-450b-adb1-8f9db5cdc9d5',
    description: 'tracksId',
  })
  @Column('char', { array: true, default: [] })
  tracks: string[];

  constructor(partial: Partial<FavoriteEntity>) {
    Object.assign(this, partial);
  }
}
