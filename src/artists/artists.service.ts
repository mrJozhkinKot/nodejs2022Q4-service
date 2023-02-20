import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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
import { TrackEntity } from 'src/tracks/track.entity';
import { FavoriteEntity } from 'src/favorites/favorites.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    @InjectRepository(FavoriteEntity)
    private favoriteRepository: Repository<FavoriteEntity>,
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

    const tracks = await this.trackRepository.find();
    const tracksOfArtist = tracks.filter((track) => track.artistId === id);
    tracksOfArtist.map(
      async (track) =>
        await this.trackRepository.save({
          ...track,
          artistId: null,
        }),
    );
    const [favIds] = await this.favoriteRepository.find();
    if (favIds && favIds.artists.length) {
      const updatedArtistFav = favIds.artists.filter(
        (artistId) => artistId !== id,
      );
      const updatedFavs = {
        ...favIds,
        artists: updatedArtistFav,
      };
      await this.favoriteRepository.save(updatedFavs);
    }
    return await this.artistRepository.delete(id);
  }
}
