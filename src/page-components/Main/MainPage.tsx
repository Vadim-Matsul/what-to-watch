import MovieList from '../../components/Move-List/Movie-List';
import { GenresCatalog } from '../../components/Genres-Catalog/Genres-Catalog';
import MovieCover from '../../components/MovieCover/MovieCover';
import { Footer } from '../../components/Footer/Footer';
import { useSelector } from 'react-redux';
import { getActiveGenre, getMovieCover, getSortedMovies } from '../../store/reducers/index.selectors';

const MainPage: React.FC = () => {

  const coverMovie = useSelector(getMovieCover);
  const active_genre = useSelector(getActiveGenre);
  const moviesList = useSelector(getSortedMovies);
  const sortedMovies = moviesList[active_genre];

  return (
    <>
      <MovieCover movie={coverMovie} />
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresCatalog />
          <MovieList movies={sortedMovies} />
        </section>
        <Footer />
      </div>
    </>
  );

};

export default MainPage;
