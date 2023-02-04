import { Controller, Get, HttpCode } from '@nestjs/common';
import { Favorites } from 'src/types/interfaces';
import { FavoritesService } from './favorites.service';

@Controller('/favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(200)
  async getAlbums(): Promise<Favorites> {
    return this.favoritesService.getFavorites();
  }
}
