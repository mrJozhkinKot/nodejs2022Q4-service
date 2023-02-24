import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { validateId } from 'src/helpers/validateId';
import { ERROR_INVALID_ID, ERROR_TRACK_NOT_FOUND } from 'src/helpers/constants';
import { CreateTrackDTO } from './dto/create-track.dto';
import { UpdateTrackDTO } from './dto/update-track-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackEntity } from './track.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async getTracks() {
    const tracks = await this.trackRepository.find();
    return tracks;
  }
  async getTrack(id: string) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const track = await this.trackRepository.findOne({ where: { id: id } });
    if (!track) {
      throw new NotFoundException(ERROR_TRACK_NOT_FOUND);
    }
    return track;
  }
  async createTrack(dto: CreateTrackDTO) {
    const newTrack = new TrackEntity(dto);
    return await this.trackRepository.save(newTrack);
  }
  async updateTrack(id: string, dto: UpdateTrackDTO) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const track = await this.trackRepository.findOne({ where: { id: id } });
    if (!track) {
      throw new NotFoundException(ERROR_TRACK_NOT_FOUND);
    }
    const updatedTrack = {
      ...track,
      ...dto,
    };
    return await this.trackRepository.save(updatedTrack);
  }
  async deleteTrack(id: string) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) {
      throw new NotFoundException(ERROR_TRACK_NOT_FOUND);
    }
    return await this.trackRepository.delete(id);
  }
}
