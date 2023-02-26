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
  UseGuards,
} from '@nestjs/common';
import { Artist } from 'src/types/interfaces';
import { CreateArtistDTO } from './dto/create-artist.dto';
import { UpdateArtistDTO } from './dto/update-artist-dto';
import { ArtistsService } from './artists.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.quard';

@ApiTags('ARTISTS')
@Controller('/artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(200)
  async getArtists(): Promise<Artist[]> {
    return this.artistsService.getArtists();
  }

  @ApiOperation({ summary: 'Get artist by id' })
  @ApiResponse({ status: 201 })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @HttpCode(200)
  async getArtist(@Param('id') id: string) {
    return this.artistsService.getArtist(id);
  }

  @ApiOperation({ summary: 'Create new artist' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async createUser(@Body() artistDto: CreateArtistDTO) {
    return this.artistsService.createArtist(artistDto);
  }

  @ApiOperation({ summary: 'Update artist' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async updateArtist(
    @Param('id') id: string,
    @Body() artistDto: UpdateArtistDTO,
  ) {
    return this.artistsService.updateArtist(id, artistDto);
  }

  @ApiOperation({ summary: 'Delete artist by id' })
  @ApiResponse({ status: 204 })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async deleteArtist(@Param('id') id: string) {
    return this.artistsService.deleteArtist(id);
  }
}
