import Image from 'next/image';
import { useRouter } from 'next/router';
import { Header } from '../Header/Header';
import ClassNames from 'classnames';
import { bePagesPaths, isServer } from '../../helpers/const/const';
import { MovieCoverProps } from './MoverCover.props';
import { MovieInformation } from '../MovieInformation/MovieInformation';
import { convertInMovieInformation } from '../../helpers/adapter/adapter';
import { MovieButtons } from '../MovieButtons/MovieButtons';
import { useSelector } from 'react-redux';
import { getFavoritesMovies } from '../../store/reducers/data-reducer/basic-slice/basic-slice-selectors';
import { useEffect } from 'react';

const MovieCover: React.FC<MovieCoverProps> = ({ movie, reviews }) => {

  const favoritesMovies = useSelector(getFavoritesMovies);

  // самовызывающаяся функция вместо useEffect сделана для того,
  // чтобы до полной отрисовки у фильма праивильно определялось состояние isFavorite
  (function () {
    favoritesMovies.length &&
      favoritesMovies.forEach(favoriteMovie => {
        if (favoriteMovie.id === movie.id) {
          movie.isFavorite = true;
        }
      });
  })();


  const { pathname } = useRouter();
  const isCurrentMoviePage = pathname === bePagesPaths.currentMovie;

  const sectionClass = ClassNames('movie-card', { 'movie-card--full': isCurrentMoviePage });
  const infoBlockClass = ClassNames({ 'movie-card__info': !isCurrentMoviePage });
  const cardHeroClass = ClassNames({ 'movie-card__hero': isCurrentMoviePage });
  const movie_information = convertInMovieInformation(movie);

  return (
    <section
      className={sectionClass}
      style={{ background: movie.backgroundColor }}
    >
      <div className={cardHeroClass} >
        <div className="movie-card__bg">
          <Image
            src={movie.backgroundImage}
            alt={movie.name}
            layout='fill'
            blurDataURL={movie.backgroundImage}
            placeholder='blur'
          />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header />

        <div className="movie-card__wrap">
          <div className={infoBlockClass}>

            {!isCurrentMoviePage &&
              <div className="movie-card__poster">
                <Image
                  src={movie.posterImage}
                  alt={movie.name}
                  width={218}
                  height={327}
                  blurDataURL={movie.posterImage}
                  placeholder='blur'
                />
              </div>
            }

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{movie.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{movie.genre}</span>
                <span className="movie-card__year">{movie.released}</span>
              </p>

              <div className="movie-card__buttons">
                <MovieButtons
                  isFavorite={movie.isFavorite}
                  movieId={movie.id}
                />
                {isCurrentMoviePage && <a href="add-review.html" className="btn movie-card__button">Add review</a>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isCurrentMoviePage && <MovieInformation movie_infogmation={movie_information} reviews={reviews} />}

    </section>
  )
}


export default MovieCover;
