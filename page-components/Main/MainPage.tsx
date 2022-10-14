import MovieList from '../../components/Move-List/Movie-List';
import { GenresCatalog } from '../../components/Genres-Catalog/Genres-Catalog';
import MovieCover from '../../components/MovieCover/MovieCover';
import { Footer } from '../../components/Footer/Footer';
import { useSelector } from 'react-redux';
import { getMovieCover } from '../../store/reducers/data-reducer/basic-slice/basic-slice-selectors';

const MainPage: React.FC = () => {
  const coverMovie = useSelector(getMovieCover);

  return (
    <>
      <MovieCover movie={coverMovie} />
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresCatalog />
          <MovieList />
        </section>
        <Footer />
      </div>
    </>
  );

};

export default MainPage;
