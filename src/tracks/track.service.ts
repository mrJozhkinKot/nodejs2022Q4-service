import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { tracks } from 'src/db/db';
import { v4 as uuid4 } from 'uuid';
import { validateId } from 'src/helpers/validateId';
import { ERROR_INVALID_ID, ERROR_TRACK_NOT_FOUND } from 'src/helpers/constants';
import { CreateTrackDTO } from './dto/create-track.dto';
import { Track } from 'src/types/interfaces';
import { UpdateTrackDTO } from './dto/update-track-dto';

@Injectable()
export class TracksService {
  async getTracks() {
    return tracks;
  }
  async getTrack(id: string) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const track = tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException(ERROR_TRACK_NOT_FOUND);
    }
    return track;
  }
  async createTrack(dto: CreateTrackDTO) {
    const id = uuid4();
    const track: Track = {
      id,
      ...dto,
    };
    tracks.push(track);
    return track;
  }
  async updateTrack(id: string, dto: UpdateTrackDTO) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const track = tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException(ERROR_TRACK_NOT_FOUND);
    }
    const updatedTrack = {
      ...track,
      ...dto,
    };
    tracks.forEach((t, index) => {
      if (t.id === track.id) {
        tracks.splice(index, 1, updatedTrack);
      }
    });
    return updatedTrack;
  }
  async deleteTask(id: string) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const track = tracks.find((task) => task.id === id);
    if (!track) {
      throw new NotFoundException(ERROR_TRACK_NOT_FOUND);
    }
    tracks.forEach((t, index) => {
      if (t.id === track.id) {
        tracks.splice(index, 1);
      }
    });
  }
}
