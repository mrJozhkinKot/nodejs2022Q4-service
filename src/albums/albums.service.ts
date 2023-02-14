import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { favorites } from 'src/db/db';
import { validateId } from 'src/helpers/validateId';
import { ERROR_INVALID_ID, ERROR_ALBUM_NOT_FOUND } from 'src/helpers/constants';
import { CreateAlbumDTO } from './dto/create-album.dto';
import { UpdateAlbumDTO } from './dto/update-album-dto';
import { AlbumEntity } from './album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TracksService } from './../tracks/track.service';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,

    private trackService: TracksService,
  ) {}

  async getAlbums() {
    const albums = await this.albumRepository.find();
    return albums;
  }
  async getAlbum(id: string) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const album = await this.albumRepository.findOne({ where: { id: id } });
    if (!album) {
      throw new NotFoundException(ERROR_ALBUM_NOT_FOUND);
    }
    return album;
  }
  async createAlbum(dto: CreateAlbumDTO) {
    const newAlbum = new AlbumEntity(dto);
    return await this.albumRepository.save(newAlbum);
  }
  async updateAlbum(id: string, dto: UpdateAlbumDTO) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const album = await this.albumRepository.findOne({ where: { id: id } });
    if (!album) {
      throw new NotFoundException(ERROR_ALBUM_NOT_FOUND);
    }
    const updatedArtist = {
      ...album,
      ...dto,
    };
    return this.albumRepository.save(updatedArtist);
  }
  async deleteAlbum(id: string) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const album = await this.albumRepository.findOne({ where: { id: id } });
    if (!album) {
      throw new NotFoundException(ERROR_ALBUM_NOT_FOUND);
    }

    const tracks = await this.trackService.getTracks();
    const tracksOfAlbum = tracks.filter((track) => track.albumId === id);
    tracksOfAlbum.map(
      async (track) =>
        await this.trackService.updateTrack(track.id, {
          ...track,
          albumId: null,
        }),
    );
    return await this.albumRepository.delete(album.id);
    // favorites.albums.forEach((fav, index) => {
    //   if (fav === album.id) {
    //     favorites.albums.splice(index, 1);
    //   }
    // });
  }
}
