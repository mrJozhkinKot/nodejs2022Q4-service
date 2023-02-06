import { Controller, Get, HttpCode, Post, Delete, Param } from '@nestjs/common';
import { FavoritesRepsonse } from 'src/types/interfaces';
import { FavoritesService } from './favorites.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('FAVORITES')
@Controller('/favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({ status: 200 })
  @Get()
  @HttpCode(200)
  async getAllFavs(): Promise<FavoritesRepsonse> {
    return this.favoritesService.getFavorites();
  }
  @ApiOperation({ summary: 'Add track to favorites' })
  @ApiResponse({ status: 201 })
  @Post('track/:id')
  @HttpCode(201)
  async addTrack(@Param('id') id: string) {
    return await this.favoritesService.addTrack(id);
  }
  @ApiOperation({ summary: 'Delete track from favorites' })
  @ApiResponse({ status: 204 })
  @Delete('track/:id')
  @HttpCode(204)
  async deleteTrack(@Param('id') id: string) {
    return await this.favoritesService.deleteTrack(id);
  }
  @ApiOperation({ summary: 'Add album to favorites' })
  @ApiResponse({ status: 201 })
  @Post('album/:id')
  @HttpCode(201)
  async addAlbum(@Param('id') id: string) {
    return await this.favoritesService.addAlbum(id);
  }
  @ApiOperation({ summary: 'Delete album from favorites' })
  @ApiResponse({ status: 204 })
  @Delete('album/:id')
  @HttpCode(204)
  async deleteAlbum(@Param('id') id: string) {
    return await this.favoritesService.deleteAlbum(id);
  }
  @ApiOperation({ summary: 'Add artist to favorites' })
  @ApiResponse({ status: 201 })
  @Post('artist/:id')
  @HttpCode(201)
  async addArtist(@Param('id') id: string) {
    return await this.favoritesService.addArtist(id);
  }
  @ApiOperation({ summary: 'Delete artist from favorites' })
  @ApiResponse({ status: 204 })
  @Delete('artist/:id')
  @HttpCode(204)
  async deleteArtist(@Param('id') id: string) {
    return await this.favoritesService.deleteArtist(id);
  }
}
