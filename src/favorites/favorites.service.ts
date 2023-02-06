import {
  BadRequestException,
  UnprocessableEntityException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { albums, artists, favorites, tracks } from 'src/db/db';
import {
  ERROR_ARTIST_NOT_FOUND,
  ERROR_INVALID_ID,
  ERROR_TRACK_NOT_FOUND,
} from 'src/helpers/constants';
import { validateId } from 'src/helpers/validateId';
import { FavoritesRepsonse } from 'src/types/interfaces';

@Injectable()
export class FavoritesService {
  async getFavorites(): Promise<FavoritesRepsonse> {
    const favs = {
      artists: artists.filter((artist) =>
        favorites.artists.includes(artist.id),
      ),
      albums: albums.filter((album) => favorites.albums.includes(album.id)),
      tracks: tracks.filter((track) => favorites.tracks.includes(track.id)),
    };
    return favs;
  }
  async addTrack(id: string) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const track = tracks.find((t) => t.id === id);
    if (!track) {
      throw new UnprocessableEntityException(ERROR_TRACK_NOT_FOUND);
    }
    favorites.tracks.push(track.id);
    return track;
  }
  async deleteTrack(id: string) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const track = tracks.find((t) => t.id === id);
    if (!track) {
      throw new NotFoundException(ERROR_TRACK_NOT_FOUND);
    }
    favorites.tracks.forEach((tr, index) => {
      if (tr === track.id) {
        favorites.tracks.splice(index, 1);
      }
    });
    return 'Track has been deleted';
  }
  async addAlbum(id: string) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const album = albums.find((al) => al.id === id);
    if (!album) {
      throw new UnprocessableEntityException(ERROR_TRACK_NOT_FOUND);
    }
    favorites.albums.push(album.id);
    return album;
  }
  async deleteAlbum(id: string) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const album = albums.find((al) => al.id === id);
    if (!album) {
      throw new NotFoundException(ERROR_TRACK_NOT_FOUND);
    }
    favorites.albums.forEach((t, index) => {
      if (t === album.id) {
        favorites.albums.splice(index, 1);
      }
    });
    return 'Album has been deleted';
  }
  async addArtist(id: string) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const artist = artists.find((art) => art.id === id);
    if (!artist) {
      throw new UnprocessableEntityException(ERROR_ARTIST_NOT_FOUND);
    }
    favorites.artists.push(artist.id);
    return artist;
  }
  async deleteArtist(id: string) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const artist = artists.find((art) => art.id === id);
    if (!artist) {
      throw new NotFoundException(ERROR_TRACK_NOT_FOUND);
    }
    favorites.artists.forEach((art, index) => {
      if (art === artist.id) {
        favorites.artists.splice(index, 1);
      }
    });
    return 'Artist has been deleted';
  }
}
