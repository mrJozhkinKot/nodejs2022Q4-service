import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteEntity } from 'src/favorites/favorites.entity';
import { TrackEntity } from 'src/tracks/track.entity';
import { AlbumEntity } from './album.entity';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlbumEntity]),
    TypeOrmModule.forFeature([FavoriteEntity]),
    TypeOrmModule.forFeature([TrackEntity]),
  ],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [TypeOrmModule],
})
export class AlbumsModule {}
