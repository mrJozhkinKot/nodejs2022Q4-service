import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { FavoriteEntity } from 'src/favorites/favorites.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tracks' })
export class TrackEntity {
  @ApiProperty({
    example: 'a4fa077c-2bb3-450b-adb1-8f9db5cdc9d2',
    description: 'id',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @ApiProperty({
    example: 'Yellow submarine',
    description: 'name',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'a4fa077c-2bb3-450b-adb1-8f9db5cdc9d3',
    description: 'artistId',
  })
  @Column()
  artistId: string;

  @ApiProperty({
    example: 'a4fa077c-2bb3-450b-adb1-8f9db5cdc9d4',
    description: 'albumId',
  })
  @Column()
  albumId: string;

  @ApiProperty({
    example: '6',
    description: 'duration',
  })
  @Column()
  duration: number;

  constructor(partial: Partial<TrackEntity>) {
    Object.assign(this, partial);
  }
}
