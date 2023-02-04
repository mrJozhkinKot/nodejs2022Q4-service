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
import { Artist } from 'src/types/interfaces';
import { CreateArtistDTO } from './dto/create-artist.dto';
import { UpdateArtistDTO } from './dto/update-artist-dto';
import { ArtistsService } from './artists.service';

@Controller('/artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  @HttpCode(200)
  async getTracks(): Promise<Artist[]> {
    return this.artistsService.getArtists();
  }
  @Get(':id')
  @HttpCode(200)
  async getArtist(@Param('id') id: string) {
    return this.artistsService.getArtist(id);
  }
  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async createUser(@Body() artistDto: CreateArtistDTO) {
    return this.artistsService.createArtist(artistDto);
  }
  @Put(':id')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async updateArtist(
    @Param('id') id: string,
    @Body() artistDto: UpdateArtistDTO,
  ) {
    return this.artistsService.updateArtist(id, artistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteArtist(@Param('id') id: string) {
    return this.artistsService.deleteArtist(id);
  }
}
