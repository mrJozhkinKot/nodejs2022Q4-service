import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './track.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity])],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService],
})
export class TracksModule {}
