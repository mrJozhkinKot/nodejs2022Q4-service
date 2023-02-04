import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Track } from 'src/types/interfaces';
import { CreateTrackDTO } from './dto/create-track.dto';
import { UpdateTrackDTO } from './dto/update-track-dto';
import { TracksService } from './track.service';

@Controller('/track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  @HttpCode(200)
  async getTracks(): Promise<Track[]> {
    return this.tracksService.getTracks();
  }
  @Get(':id')
  @HttpCode(200)
  async getTrack(@Param('id') id: string) {
    return this.tracksService.getTrack(id);
  }
  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async createUser(@Body() trackDto: CreateTrackDTO) {
    return this.tracksService.createTrack(trackDto);
  }
  @Put(':id')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async updateTrack(@Param('id') id: string, @Body() trackDto: UpdateTrackDTO) {
    return this.tracksService.updateTrack(id, trackDto);
  }
  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(@Param('id') id: string) {
    return this.tracksService.deleteTask(id);
  }
}
