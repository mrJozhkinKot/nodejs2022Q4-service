import { ApiProperty } from '@nestjs/swagger';
import { TrackEntity } from 'src/tracks/track.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'favorites_track' })
export class FavoriteTrackEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'a4fa077c-2bb3-450b-adb1-8f9db5cdc9d4',
    description: 'trackId',
  })
  @Column({ name: 'track_id', type: 'uuid' })
  trackId: string | null;

  @ManyToOne(() => TrackEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'track_id', referencedColumnName: 'id' })
  track: TrackEntity;
}
