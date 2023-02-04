import { Controller, Get, HttpCode, Post, Delete, Param } from '@nestjs/common';
import { FavoritesRepsonse } from 'src/types/interfaces';
import { FavoritesService } from './favorites.service';

@Controller('/favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(200)
  async getAllFavs(): Promise<FavoritesRepsonse> {
    return this.favoritesService.getFavorites();
  }
  @Post('track/:id')
  @HttpCode(201)
  async addTrack(@Param('id') id: string) {
    return await this.favoritesService.addTrack(id);
  }
  @Delete('track/:id')
  @HttpCode(204)
  async deleteTrack(@Param('id') id: string) {
    return await this.favoritesService.deleteTrack(id);
  }
  @Post('album/:id')
  @HttpCode(201)
  async addAlbum(@Param('id') id: string) {
    return await this.favoritesService.addAlbum(id);
  }
  @Delete('album/:id')
  @HttpCode(204)
  async deleteAlbum(@Param('id') id: string) {
    return await this.favoritesService.deleteAlbum(id);
  }
  @Post('artist/:id')
  @HttpCode(201)
  async addArtist(@Param('id') id: string) {
    return await this.favoritesService.addArtist(id);
  }
  @Delete('artist/:id')
  @HttpCode(204)
  async deleteArtist(@Param('id') id: string) {
    return await this.favoritesService.deleteArtist(id);
  }
}
