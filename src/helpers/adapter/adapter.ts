import { IsDetails, isOverview, Movie, MovieInformation } from '../../types/movies';
import { convertMinuteToTime } from '../utils/utils';

export const convertInMovieInformation = (movie: Movie): MovieInformation => ({
  name: movie.name,
  posterImage: movie.posterImage,
  description: movie.description,
  rating: movie.rating,
  scores_count: movie.scoresCount,
  director: movie.director,
  starring: movie.starring,
  released: movie.released,
  run_time: movie.runTime,
  genre: movie.genre,
  is_favorite: movie.isFavorite,
  video_link: movie.videoLink
})

export const adaptToDetails = (info: MovieInformation): IsDetails => ([
  [
    { name: 'Director', value: info.director },
    { name: 'Starring', value: info.starring }
  ],
  [
    { name: 'Run Time', value: convertMinuteToTime(info.run_time) },
    { name: 'Genre', value: info.genre },
    { name: 'Released', value: info.released },
  ]
]);

export const adaptToOverview = (info: MovieInformation): isOverview => ([
  { value: info.description },
  { name: 'Director', value: info.director },
  { name: 'Starring', value: info.starring }
]);