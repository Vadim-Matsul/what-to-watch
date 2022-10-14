import { Movie, MovieInformation } from '../../types/movies';

export const convertInMovieInformation = (movie: Movie): MovieInformation => ({
  name: movie.name,
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