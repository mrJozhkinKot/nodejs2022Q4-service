import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteEntity } from 'src/favorites/favorites.entity';
import { TrackEntity } from 'src/tracks/track.entity';
import { ArtistEntity } from './artist.entity';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArtistEntity]),
    TypeOrmModule.forFeature([FavoriteEntity]),
    TypeOrmModule.forFeature([TrackEntity]),
  ],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [TypeOrmModule],
})
export class ArtistsModule {}
