import { useSelector } from 'react-redux';
import { getMoviesGenres } from '../../helpers/utils/utils';
import { GenreItem } from '..';
import { getMovies } from '../../store/reducers/index.selectors';

export const GenresCatalog: React.FC = () => {
  const movies = useSelector(getMovies);
  const allGenres = getMoviesGenres(movies);

  return (
    <ul className="catalog__genres-list">
      {allGenres.map((genre, i) => <GenreItem genre={genre} key={genre + i} />)}
    </ul>
  );
};
