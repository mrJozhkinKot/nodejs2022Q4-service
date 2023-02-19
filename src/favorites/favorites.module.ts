import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/albums/album.entity';
import { ArtistEntity } from 'src/artists/artist.entity';
import { TrackEntity } from 'src/tracks/track.entity';
import { FavoritesController } from './favorites.controller';
import { FavoriteEntity } from './favorites.entity';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoriteEntity]),
    TypeOrmModule.forFeature([TrackEntity]),
    TypeOrmModule.forFeature([AlbumEntity]),
    TypeOrmModule.forFeature([ArtistEntity]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [TypeOrmModule],
})
export class FavoritesModule {}
