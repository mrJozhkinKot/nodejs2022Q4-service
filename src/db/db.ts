import { Album, Artist, Favorites, Track, User } from 'src/types/interfaces';

export const users: User[] = [
  {
    id: '22345200-abe8-4f60-90c8-0d43c5f6c0f6',
    login: 'John Doe',
    password: 'qwerty',
    version: 1,
    createdAt: 10.01,
    updatedAt: 25.01,
  },
];

export const tracks: Track[] = [
  {
    id: '22345200-abe8-4f60-90c8-0d43c5f6c0f6',
    name: 'some song',
    artistId: null,
    albumId: null,
    duration: 6,
  },
];

export const artists: Artist[] = [
  {
    id: '22345200-abe8-4f60-90c8-0d43c5f6c0f6',
    name: 'John Lennon',
    grammy: true,
  },
];

export const albums: Album[] = [
  {
    id: '22345200-abe8-4f60-90c8-0d43c5f6c0f6',
    name: 'New Album',
    year: 1960,
    artistId: '22345200-abe8-4f60-90c8-0d43c5f6c0f6',
  },
];

export const favorites: Favorites = {
  artists: [],
  albums: [],
  tracks: [],
};
