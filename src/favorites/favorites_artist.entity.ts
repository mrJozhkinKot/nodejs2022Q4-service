import { ApiProperty } from '@nestjs/swagger';
import { ArtistEntity } from 'src/artists/artist.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'favorites_artist' })
export class FavoriteArtistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'a4fa077c-2bb3-450b-adb1-8f9db5cdc9d4',
    description: 'artistId',
  })
  @Column({ name: 'artist_id', type: 'uuid' })
  artistId: string | null;

  @ManyToOne(() => ArtistEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'artist_id', referencedColumnName: 'id' })
  artist: ArtistEntity;
}
