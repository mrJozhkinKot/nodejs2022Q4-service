import { ApiProperty } from '@nestjs/swagger';
import { ArtistEntity } from 'src/artists/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'albums' })
export class AlbumEntity {
  @ApiProperty({
    example: 'a4fa077c-2bb3-450b-adb1-8f9db5cdc9d3',
    description: 'id',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @ApiProperty({
    example: 'The best',
    description: 'name',
  })
  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @ApiProperty({
    example: '1979',
    description: 'year',
  })
  @Column({ name: 'year', type: 'integer' })
  year: number;

  @ApiProperty({
    example: 'a4fa077c-2bb3-450b-adb1-8f9db5cdc9d3',
    description: 'artistId',
  })
  @Column({ name: 'artistId', type: 'uuid', default: null })
  artistId: string;

  @ManyToOne(() => ArtistEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId', referencedColumnName: 'id' })
  artist: ArtistEntity;

  constructor(partial: Partial<AlbumEntity>) {
    Object.assign(this, partial);
  }
}
