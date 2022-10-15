import React from 'react';
import { useSelector } from 'react-redux';
import { getSortedMovies } from '../../store/reducers/data-reducer/basic-slice/basic-slice-selectors';
import MovieList from '../Move-List/Movie-List';
import { MoreLikesMoviesProps } from './MoreLikesMovies.props';


export const MoreLikesMovies: React.FC<MoreLikesMoviesProps> = ({ curent_movie_id, curent_movie_genre }) => {
  const sortedMovies = useSelector(getSortedMovies);
  const filterdMovies = sortedMovies[curent_movie_genre].filter(movie => movie.id !== curent_movie_id);

  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>
      <MovieList movies={filterdMovies} />
    </section>
  );
};