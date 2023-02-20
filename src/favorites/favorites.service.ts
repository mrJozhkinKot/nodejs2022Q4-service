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

type Favs = {
  artists: string[];
  albums: string[];
  tracks: string[];
};

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

  initFavs: Favs = {
    artists: [],
    albums: [],
    tracks: [],
  };
  async getFavorites(): Promise<FavoritesRepsonse> {
    const [favIds] = await this.favoriteRepository.find();
    if (!favIds) {
      await this.favoriteRepository.save(this.initFavs);
    }
    const artists = favIds.artists.length
      ? await Promise.all(
          favIds.artists.map(
            async (artistId) =>
              await this.artistRepository.findOne({ where: { id: artistId } }),
          ),
        )
      : [];
    const albums = favIds.albums.length
      ? await Promise.all(
          favIds.albums.map(
            async (albumId) =>
              await this.albumRepository.findOne({ where: { id: albumId } }),
          ),
        )
      : [];
    const tracks = favIds.tracks.length
      ? await Promise.all(
          favIds.tracks.map(
            async (trackId) =>
              await this.trackRepository.findOne({ where: { id: trackId } }),
          ),
        )
      : [];
    return { artists, albums, tracks };
  }

  async addTrack(id: string): Promise<TrackEntity> {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) {
      throw new UnprocessableEntityException(ERROR_TRACK_NOT_FOUND);
    }
    const [favIds] = await this.favoriteRepository.find();
    if (!favIds) {
      const updatedFavs = this.favoriteRepository.create({
        ...this.initFavs,
        tracks: [id],
      });
      await this.favoriteRepository.save(updatedFavs);
      return track;
    }
    const updatedTracks = favIds.tracks.length
      ? [...new Set([...favIds.tracks, id])]
      : [track.id];
    const updatedFavs = {
      ...favIds,
      tracks: updatedTracks,
    };
    await this.favoriteRepository.save(updatedFavs);
    return track;
  }

  async deleteTrack(id: string) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) {
      throw new UnprocessableEntityException(ERROR_TRACK_NOT_FOUND);
    }
    const [favIds] = await this.favoriteRepository.find();
    if (!favIds || !favIds.tracks.length) {
      throw new NotFoundException(ERROR_TRACK_NOT_FOUND);
    }
    const updatedTracks = favIds.tracks.filter((trackId) => trackId !== id);
    const updatedFavs = {
      ...favIds,
      tracks: updatedTracks,
    };
    await this.favoriteRepository.save(updatedFavs);
    return;
  }

  async addAlbum(id: string): Promise<AlbumEntity> {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new UnprocessableEntityException(ERROR_ALBUM_NOT_FOUND);
    }
    const [favIds] = await this.favoriteRepository.find();
    if (!favIds) {
      const updatedFavs = this.favoriteRepository.create({
        ...this.initFavs,
        albums: [id],
      });
      await this.favoriteRepository.save(updatedFavs);
      return album;
    }
    const updatedAlbums = favIds.albums.length
      ? [...new Set([...favIds.albums, id])]
      : [id];
    const updatedFavs = {
      ...favIds,
      albums: updatedAlbums,
    };
    await this.favoriteRepository.save(updatedFavs);
    return album;
  }

  async deleteAlbum(id: string) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new UnprocessableEntityException(ERROR_ALBUM_NOT_FOUND);
    }
    const [favIds] = await this.favoriteRepository.find();
    if (!favIds || !favIds.albums.length) {
      throw new NotFoundException(ERROR_ALBUM_NOT_FOUND);
    }
    const updatedAlbums = favIds.albums.filter((albumId) => albumId !== id);
    const updatedFavs = {
      ...favIds,
      albums: updatedAlbums,
    };
    await this.favoriteRepository.save(updatedFavs);
    return;
  }

  async addArtist(id: string): Promise<ArtistEntity> {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) {
      throw new UnprocessableEntityException(ERROR_ARTIST_NOT_FOUND);
    }
    const [favIds] = await this.favoriteRepository.find();
    if (!favIds) {
      const updatedFavs = this.favoriteRepository.create({
        ...this.initFavs,
        artists: [id],
      });
      await this.favoriteRepository.save(updatedFavs);
      return artist;
    }
    const updatedArtist = favIds.artists
      ? [...new Set([...favIds.artists, id])]
      : [artist.id];
    const updatedFavs = {
      ...favIds,
      artists: updatedArtist,
    };
    await this.favoriteRepository.save(updatedFavs);
    return artist;
  }

  async deleteArtist(id: string) {
    if (!validateId(id)) {
      throw new BadRequestException(ERROR_INVALID_ID);
    }
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) {
      throw new UnprocessableEntityException(ERROR_ARTIST_NOT_FOUND);
    }
    const [favIds] = await this.favoriteRepository.find();
    if (!favIds || !favIds.artists.length) {
      throw new NotFoundException(ERROR_ARTIST_NOT_FOUND);
    }
    const updatedArtist = favIds.artists.filter((artistId) => artistId !== id);
    const updatedFavs = {
      ...favIds,
      artists: updatedArtist,
    };
    await this.favoriteRepository.save(updatedFavs);
    return;
  }
}
