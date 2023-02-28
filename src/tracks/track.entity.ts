import { ApiProperty } from '@nestjs/swagger';
import { AlbumEntity } from 'src/albums/album.entity';
import { ArtistEntity } from 'src/artists/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @ApiProperty({
    example: 'a4fa077c-2bb3-450b-adb1-8f9db5cdc9d3',
    description: 'artistId',
  })
  @Column({ name: 'artistId', type: 'uuid', default: null })
  artistId: string;

  @ApiProperty({
    example: 'a4fa077c-2bb3-450b-adb1-8f9db5cdc9d4',
    description: 'albumId',
  })
  @Column({ name: 'albumId', type: 'uuid', default: null })
  albumId: string;

  @ApiProperty({
    example: '6',
    description: 'duration',
  })
  @Column({ name: 'duration', type: 'integer' })
  duration: number;

  @ManyToOne(() => AlbumEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'albumId', referencedColumnName: 'id' })
  album: AlbumEntity;

  @ManyToOne(() => ArtistEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId', referencedColumnName: 'id' })
  artist: ArtistEntity;

  constructor(partial: Partial<TrackEntity>) {
    Object.assign(this, partial);
  }
}
