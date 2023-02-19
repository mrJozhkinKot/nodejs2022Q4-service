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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('TRACKS')
@Controller('/track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({ status: 200 })
  @Get()
  @HttpCode(200)
  async getTracks(): Promise<Track[]> {
    return this.tracksService.getTracks();
  }
  @ApiOperation({ summary: 'Get track by id' })
  @ApiResponse({ status: 200 })
  @Get(':id')
  @HttpCode(200)
  async getTrack(@Param('id') id: string) {
    return this.tracksService.getTrack(id);
  }
  @ApiOperation({ summary: 'Create new track' })
  @ApiResponse({ status: 201 })
  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async createUser(@Body() trackDto: CreateTrackDTO) {
    return this.tracksService.createTrack(trackDto);
  }
  @ApiOperation({ summary: 'Update new track' })
  @ApiResponse({ status: 200 })
  @Put(':id')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async updateTrack(@Param('id') id: string, @Body() trackDto: UpdateTrackDTO) {
    return this.tracksService.updateTrack(id, trackDto);
  }
  @ApiOperation({ summary: 'Delete track by id' })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(@Param('id') id: string) {
    return this.tracksService.deleteTrack(id);
  }
}
