import { useSelector } from 'react-redux';
import { getMoviesGenres } from '../../helpers/utils/utils';
import { getMovies } from '../../store/reducers/data-reducer/basic-slice/basic-slice-selectors';
import { GenreItem } from '../Genre-Item/Genre-Item';

export const GenresCatalog: React.FC = () => {
  const movies = useSelector(getMovies);
  const allGenres = getMoviesGenres(movies);

  return (
    <ul className="catalog__genres-list">
      {allGenres.map((genre, i) => <GenreItem genre={genre} key={genre + i} />)}
    </ul>
  );
};
