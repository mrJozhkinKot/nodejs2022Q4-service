import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { FavoriteArtistEntity } from './favorites_artist.entity';
import { FavoriteAlbumEntity } from './favorites_album.entity';
import { FavoriteTrackEntity } from './favorites_track.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavoriteTrackEntity,
      FavoriteAlbumEntity,
      FavoriteArtistEntity,
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
