import {
  BadRequestException,
  UnprocessableEntityException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ERROR_ALBUM_NOT_FOUND,
  ERROR_ARTIST_NOT_FOUND,
  ERROR_INVALID_ID,
  ERROR_TRACK_NOT_FOUND,
} from 'src/helpers/constants';
import { validateId } from 'src/helpers/validateId';
import { FavoritesRepsonse } from 'src/types/interfaces';
import { Repository } from 'typeorm';
import { FavoriteArtistEntity } from './favorites_artist.entity';
import { FavoriteAlbumEntity } from './favorites_album.entity';
import { FavoriteTrackEntity } from './favorites_track.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoriteArtistEntity)
    private favoriteArtistRepository: Repository<FavoriteArtistEntity>,
    @InjectRepository(FavoriteAlbumEntity)
    private favoriteAlbumRepository: Repository<FavoriteAlbumEntity>,
    @InjectRepository(FavoriteTrackEntity)
    private favoriteTrackRepository: Repository<FavoriteTrackEntity>,
  ) {}

  async getFavorites(): Promise<FavoritesRepsonse> {
    const [favTracks, favAlbums, favArtists] = await Promise.all([
      this.favoriteTrackRepository.find({
        relations: { track: true },
      }),
      this.favoriteAlbumRepository.find({
        relations: { album: true },
      }),
      this.favoriteArtistRepository.find({
        relations: { artist: true },
      }),
    ]);
    const tracks = favTracks.map((trackId) => trackId.track);
    const albums = favAlbums.map((albumId) => albumId.album);
    const artists = favArtists.map((artistId) => artistId.artist);
    return { artists, albums, tracks };
  }

  async addTrack(id: string) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const track = this.favoriteTrackRepository.create({ trackId: id });
    try {
      await this.favoriteTrackRepository.save(track);
    } catch (error) {
      throw new UnprocessableEntityException(ERROR_TRACK_NOT_FOUND);
    }
  }

  async deleteTrack(id: string) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const track = await this.favoriteTrackRepository.findOne({
      where: { trackId: id },
    });
    if (!track) {
      throw new UnprocessableEntityException(ERROR_TRACK_NOT_FOUND);
    }
    await this.favoriteTrackRepository.delete(track.id);
  }

  async addAlbum(id: string) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const album = this.favoriteAlbumRepository.create({ albumId: id });
    try {
      await this.favoriteAlbumRepository.save(album);
    } catch (error) {
      throw new UnprocessableEntityException(ERROR_ALBUM_NOT_FOUND);
    }
  }

  async deleteAlbum(id: string) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const album = await this.favoriteAlbumRepository.findOne({
      where: { albumId: id },
    });
    if (!album) {
      throw new UnprocessableEntityException(ERROR_ALBUM_NOT_FOUND);
    }
    await this.favoriteAlbumRepository.delete(album.id);
  }

  async addArtist(id: string) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const artist = this.favoriteArtistRepository.create({ artistId: id });
    try {
      await this.favoriteArtistRepository.save(artist);
    } catch (error) {
      throw new UnprocessableEntityException(ERROR_ARTIST_NOT_FOUND);
    }
  }

  async deleteArtist(id: string) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const artist = await this.favoriteArtistRepository.findOne({
      where: { artistId: id },
    });
    if (!artist) {
      throw new UnprocessableEntityException(ERROR_ARTIST_NOT_FOUND);
    }
    await this.favoriteArtistRepository.delete(artist.id);
  }
}
