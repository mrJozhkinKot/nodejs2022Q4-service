import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './track.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './track.entity';
import { FavoriteEntity } from 'src/favorites/favorites.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrackEntity]),
    TypeOrmModule.forFeature([FavoriteEntity]),
  ],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TypeOrmModule],
})
export class TracksModule {}
