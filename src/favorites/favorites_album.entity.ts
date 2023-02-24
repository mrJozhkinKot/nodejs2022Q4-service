import { ApiProperty } from '@nestjs/swagger';
import { AlbumEntity } from 'src/albums/album.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'favorites_album' })
export class FavoriteAlbumEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'a4fa077c-2bb3-450b-adb1-8f9db5cdc9d4',
    description: 'albumId',
  })
  @Column({ name: 'album_id', type: 'uuid' })
  albumId: string | null;

  @ManyToOne(() => AlbumEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'album_id', referencedColumnName: 'id' })
  album: AlbumEntity;
}
