import MovieList from '../../components/Move-List/Movie-List';
import { GenresCatalog } from '../../components/Genres-Catalog/Genres-Catalog';
import MovieCover from '../../components/MovieCover/MovieCover';

const MainPage: React.FC = () => {


  return (
    <>
      <MovieCover />

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresCatalog />

          <MovieList />

        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );

};

export default MainPage;
