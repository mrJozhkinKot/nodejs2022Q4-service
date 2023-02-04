import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { artists, favorites, tracks } from 'src/db/db';
import { v4 as uuid4 } from 'uuid';
import { validateId } from 'src/helpers/validateId';
import {
  ERROR_INVALID_ID,
  ERROR_ARTIST_NOT_FOUND,
} from 'src/helpers/constants';
import { CreateArtistDTO } from './dto/create-artist.dto';
import { Artist } from 'src/types/interfaces';
import { UpdateArtistDTO } from './dto/update-artist-dto';

@Injectable()
export class ArtistsService {
  async getArtists() {
    return artists;
  }
  async getArtist(id: string) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const artist = artists.find((track) => track.id === id);
    if (!artist) {
      throw new NotFoundException(ERROR_ARTIST_NOT_FOUND);
    }
    return artist;
  }
  async createArtist(dto: CreateArtistDTO) {
    const id = uuid4();
    const artist: Artist = {
      id,
      ...dto,
    };
    artists.push(artist);
    return artist;
  }
  async updateArtist(id: string, dto: UpdateArtistDTO) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const artist = artists.find((track) => track.id === id);
    if (!artist) {
      throw new NotFoundException(ERROR_ARTIST_NOT_FOUND);
    }
    const updatedArtist = {
      ...artist,
      ...dto,
    };
    artists.forEach((a, index) => {
      if (a.id === artist.id) {
        artists.splice(index, 1, updatedArtist);
      }
    });
    return updatedArtist;
  }
  async deleteArtist(id: string) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const artist = artists.find((task) => task.id === id);
    if (!artist) {
      throw new NotFoundException(ERROR_ARTIST_NOT_FOUND);
    }
    artists.forEach((a, index) => {
      if (a.id === artist.id) {
        artists.splice(index, 1);
      }
    });
    tracks.forEach((track, index) => {
      if (track.artistId === artist.id) {
        tracks.splice(index, 1, { ...track, artistId: null });
      }
    });
    favorites.artists.forEach((fav, index) => {
      if (fav === artist.id) {
        favorites.artists.splice(index, 1);
      }
    });
  }
}
