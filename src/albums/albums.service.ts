import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { albums, tracks } from 'src/db/db';
import { v4 as uuid4 } from 'uuid';
import { validateId } from 'src/helpers/validateId';
import { ERROR_INVALID_ID, ERROR_ALBUM_NOT_FOUND } from 'src/helpers/constants';
import { CreateAlbumDTO } from './dto/create-album.dto';
import { UpdateAlbumDTO } from './dto/update-album-dto';
import { Album } from 'src/types/interfaces';

@Injectable()
export class AlbumsService {
  async getAlbums() {
    return albums;
  }
  async getAlbum(id: string) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const album = albums.find((track) => track.id === id);
    if (!album) {
      throw new NotFoundException(ERROR_ALBUM_NOT_FOUND);
    }
    return album;
  }
  async createAlbum(dto: CreateAlbumDTO) {
    const id = uuid4();
    const album: Album = {
      id,
      ...dto,
    };
    albums.push(album);
    return album;
  }
  async updateAlbum(id: string, dto: UpdateAlbumDTO) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const album = albums.find((track) => track.id === id);
    if (!album) {
      throw new NotFoundException(ERROR_ALBUM_NOT_FOUND);
    }
    const updatedArtist = {
      ...album,
      ...dto,
    };
    albums.forEach((al, index) => {
      if (al.id === album.id) {
        albums.splice(index, 1, updatedArtist);
      }
    });
    return updatedArtist;
  }
  async deleteAlbum(id: string) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const album = albums.find((task) => task.id === id);
    if (!album) {
      throw new NotFoundException(ERROR_ALBUM_NOT_FOUND);
    }
    albums.forEach((al, index) => {
      if (al.id === album.id) {
        albums.splice(index, 1);
      }
    });
    tracks.forEach((track, index) => {
      if (track.albumId === album.id) {
        tracks.splice(index, 1, { ...track, albumId: null });
      }
    });
  }
}
