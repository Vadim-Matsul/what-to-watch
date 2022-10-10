import { MovieListProps } from './Movie-List.props';
import MovieCard from '../Movie-Card/Movie-Card';
import { useState } from 'react'

const MovieList: React.FC<MovieListProps> = ({ movies, onTitleClick }) => {
  const [currentMovie, setCurrentMovie] = useState<string | null>(null)

  const movieCardHover = (movie: string) => setCurrentMovie(movie);

  return (
    <div className="catalog__movies-list">
      {movies.map((movie, i) =>
        <MovieCard
          key={movie + i}
          img_title={movie}
          onTitleClick={onTitleClick}
          onCardHover={movieCardHover}
        />)}
    </div>
  );
};


export default MovieList;