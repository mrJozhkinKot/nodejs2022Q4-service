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
import { TracksService } from 'src/tracks/track.service';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,

    private trackService: TracksService,
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

    const tracks = await this.trackService.getTracks();
    const tracksOfAlbum = tracks.filter((track) => track.artistId === id);
    tracksOfAlbum.map(
      async (track) =>
        await this.trackService.updateTrack(track.id, {
          ...track,
          artistId: null,
        }),
    );

    return await this.artistRepository.delete(artist.id);
    // favorites.artists.forEach((fav, index) => {
    //   if (fav === artist.id) {
    //     favorites.artists.splice(index, 1);
    //   }
    // });
  }
}
