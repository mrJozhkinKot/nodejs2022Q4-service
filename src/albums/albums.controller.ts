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
import { Album } from 'src/types/interfaces';
import { CreateAlbumDTO } from './dto/create-album.dto';
import { UpdateAlbumDTO } from './dto/update-album-dto';
import { AlbumsService } from './albums.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.quard';

@ApiTags('ALBUMS')
@Controller('/album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @ApiOperation({ summary: 'Get all albums' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(200)
  async getAlbums(): Promise<Album[]> {
    return this.albumsService.getAlbums();
  }

  @ApiOperation({ summary: 'Get album by id' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @HttpCode(200)
  async getAlbum(@Param('id') id: string) {
    return this.albumsService.getAlbum(id);
  }

  @ApiOperation({ summary: 'Create album' })
  @ApiResponse({ status: 201 })
  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async createUser(@Body() albumDto: CreateAlbumDTO) {
    return this.albumsService.createAlbum(albumDto);
  }

  @ApiOperation({ summary: 'Update album' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async updateArtist(
    @Param('id') id: string,
    @Body() albumDto: UpdateAlbumDTO,
  ) {
    return this.albumsService.updateAlbum(id, albumDto);
  }

  @ApiOperation({ summary: 'Delete album by id' })
  @ApiResponse({ status: 204 })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async deleteAlbum(@Param('id') id: string) {
    return this.albumsService.deleteAlbum(id);
  }
}
