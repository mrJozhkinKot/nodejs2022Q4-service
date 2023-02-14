import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { favorites, tracks } from 'src/db/db';
import { validateId } from 'src/helpers/validateId';
import {
  ERROR_INVALID_ID,
  ERROR_ARTIST_NOT_FOUND,
} from 'src/helpers/constants';
import { CreateArtistDTO } from './dto/create-artist.dto';
import { UpdateArtistDTO } from './dto/update-artist-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistEntity } from './artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {}

  async getArtists() {
    const artists = await this.artistRepository.find();
    return artists;
  }

  async getArtist(id: string) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const artist = await this.artistRepository.findOne({ where: { id: id } });
    if (!artist) {
      throw new NotFoundException(ERROR_ARTIST_NOT_FOUND);
    }
    return artist;
  }

  async createArtist(dto: CreateArtistDTO) {
    const newArtist = new ArtistEntity(dto);
    return await this.artistRepository.save(newArtist);
  }

  async updateArtist(id: string, dto: UpdateArtistDTO) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const artist = await this.artistRepository.findOne({ where: { id: id } });
    if (!artist) {
      throw new NotFoundException(ERROR_ARTIST_NOT_FOUND);
    }
    const updatedArtist = {
      ...artist,
      ...dto,
    };
    return await this.artistRepository.save(updatedArtist);
  }
  async deleteArtist(id: string) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const artist = await this.artistRepository.findOne({ where: { id: id } });
    if (!artist) {
      throw new NotFoundException(ERROR_ARTIST_NOT_FOUND);
    }
    return await this.artistRepository.delete(artist.id);
    // tracks.forEach((track, index) => {
    //   if (track.artistId === artist.id) {
    //     tracks.splice(index, 1, { ...track, artistId: null });
    //   }
    // });
    // favorites.artists.forEach((fav, index) => {
    //   if (fav === artist.id) {
    //     favorites.artists.splice(index, 1);
    //   }
    // });
  }
}
