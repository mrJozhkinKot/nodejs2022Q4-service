import {
  BadRequestException,
  UnprocessableEntityException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/albums/album.entity';
import { ArtistEntity } from 'src/artists/artist.entity';
import {
  ERROR_ALBUM_NOT_FOUND,
  ERROR_ARTIST_NOT_FOUND,
  ERROR_INVALID_ID,
  ERROR_TRACK_NOT_FOUND,
} from 'src/helpers/constants';
import { validateId } from 'src/helpers/validateId';
import { TrackEntity } from 'src/tracks/track.entity';
import { FavoritesRepsonse } from 'src/types/interfaces';
import { Repository } from 'typeorm';
import { FavoriteEntity } from './favorites.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoriteEntity)
    private favoriteRepository: Repository<FavoriteEntity>,
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async getFavorites(): Promise<FavoritesRepsonse> {
    const [favIds] = await this.favoriteRepository.find();
    if (!favIds) {
      return {
        artists: [],
        albums: [],
        tracks: [],
      };
    }
    const artists = favIds.artists
      ? await Promise.all(
          favIds.artists?.map((artistId) =>
            this.artistRepository.findOne({ where: { id: artistId } }),
          ),
        )
      : [];
    const albums = favIds.albums
      ? await Promise.all(
          favIds.albums.map((albumId) =>
            this.albumRepository.findOne({ where: { id: albumId } }),
          ),
        )
      : [];
    const tracks = favIds.tracks
      ? await Promise.all(
          favIds.tracks?.map((trackId) =>
            this.trackRepository.findOne({ where: { id: trackId } }),
          ),
        )
      : [];
    return { artists, albums, tracks };
  }

  async addTrack(id: string) {
    const [favIds] = await this.favoriteRepository.find();
    if (!favIds) {
      this.favoriteRepository.save({});
    }
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const track = await this.trackRepository.findOne({ where: { id: id } });
    if (!track) {
      throw new UnprocessableEntityException(ERROR_TRACK_NOT_FOUND);
    }

    const updatedTracks = favIds.tracks ? [...favIds.tracks, id] : [track.id];
    const updatedFavs = {
      ...favIds,
      tracks: updatedTracks,
    };
    await this.favoriteRepository.save(updatedFavs);
    return track;
  }

  async deleteTrack(id: string) {
    const [favIds] = await this.favoriteRepository.find();
    if (!favIds) {
      this.favoriteRepository.save({});
    }
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const track = await this.trackRepository.findOne({ where: { id: id } });
    if (!track) {
      throw new NotFoundException(ERROR_TRACK_NOT_FOUND);
    }
    const updatedTracks = favIds.tracks
      ? favIds.tracks.filter((trackId) => trackId !== id)
      : null;
    const updatedFavs = {
      ...favIds,
      tracks: updatedTracks,
    };
    await this.favoriteRepository.save(updatedFavs);
    return updatedFavs;
  }

  async addAlbum(id: string) {
    const [favIds] = await this.favoriteRepository.find();
    if (!favIds) {
      this.favoriteRepository.save({});
    }
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const album = await this.albumRepository.findOne({ where: { id: id } });
    if (!album) {
      throw new UnprocessableEntityException(ERROR_ALBUM_NOT_FOUND);
    }
    const updatedAlbums = favIds.albums ? [...favIds.albums, id] : [id];
    const updatedFavs = {
      ...favIds,
      albums: updatedAlbums,
    };
    await this.favoriteRepository.save(updatedFavs);
    return album;
  }

  async deleteAlbum(id: string) {
    const [favIds] = await this.favoriteRepository.find();
    if (!favIds) {
      this.favoriteRepository.save({});
    }
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const album = await this.albumRepository.findOne({ where: { id: id } });
    if (!album) {
      throw new NotFoundException(ERROR_TRACK_NOT_FOUND);
    }
    const updatedAlbums = favIds.albums
      ? favIds.albums.filter((albumId) => albumId !== id)
      : null;
    const updatedFavs = {
      ...favIds,
      albums: updatedAlbums,
    };
    await this.favoriteRepository.save(updatedFavs);
    return updatedFavs;
  }
  async addArtist(id: string) {
    const [favIds] = await this.favoriteRepository.find();
    if (!favIds) {
      this.favoriteRepository.save({});
    }
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const artist = await this.artistRepository.findOne({ where: { id: id } });
    if (!artist) {
      throw new UnprocessableEntityException(ERROR_ARTIST_NOT_FOUND);
    }
    const updatedArtist = favIds.artists
      ? [...favIds.artists, id]
      : [artist.id];
    const updatedFavs = {
      ...favIds,
      artists: updatedArtist,
    };
    await this.favoriteRepository.save(updatedFavs);
    return artist;
  }

  async deleteArtist(id: string) {
    const [favIds] = await this.favoriteRepository.find();
    if (!favIds) {
      this.favoriteRepository.save({});
    }
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) {
      throw new NotFoundException(ERROR_ARTIST_NOT_FOUND);
    }
    const updatedArtist = favIds.albums
      ? favIds.artists.filter((artistId) => artistId !== id)
      : null;
    const updatedFavs = {
      ...favIds,
      artists: updatedArtist,
    };
    await this.favoriteRepository.save(updatedFavs);
    return updatedFavs;
  }
}
