import React from 'react';
import { useSelector } from 'react-redux';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import MovieList from '../../components/Move-List/Movie-List';
import { isServer } from '../../helpers/const/const';
import { getFavoritesMovies, getSortedFavoritesMovies } from '../../store/reducers/data-reducer/basic-slice/basic-slice-selectors';


export const MyFavoritesList: React.FC = () => {
  const favoritesMovies = isServer ? [] : useSelector(getSortedFavoritesMovies);

  return (
    <div className="user-page">
      <Header isFavorite />
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <MovieList movies={favoritesMovies} />
      </section>
      <Footer />
    </div>
  );
};
