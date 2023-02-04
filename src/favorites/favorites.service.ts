import { Injectable } from '@nestjs/common';
import { favorites } from 'src/db/db';

@Injectable()
export class FavoritesService {
  async getFavorites() {
    return favorites;
  }
}
