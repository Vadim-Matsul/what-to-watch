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
import { ReviewForm } from '../ReviewForm/ReviewForm';
import Link from 'next/link';

const MovieCover: React.FC<MovieCoverProps> = (props) => {
  const { movie, reviews, shouldShowBreadcrumbsHeader = false } = props;
  const favoritesMovies = useSelector(getFavoritesMovies);

  // самовызывающаяся функция вместо useEffect сделана для того,
  // чтобы до полной отрисовки у фильма праивильно определялось состояние isFavorite
  (function () {
    favoritesMovies.length &&
      favoritesMovies.forEach(favoriteMovie => {
        if (favoriteMovie.id === movie.id) {
          movie.isFavorite = true;
        }
      })
  })();

  console.log(movie.isFavorite, movie.id);


  const { pathname } = useRouter();

  const isCurrentMoviePageReview = pathname === bePagesPaths.currentMovieReview;
  const isCurrentMoviePage = pathname === bePagesPaths.currentMovie;
  const doubleBundle = isCurrentMoviePage || isCurrentMoviePageReview;

  const imgClass = isCurrentMoviePageReview ? 'header' : 'hero';

  const infoBlockClass = ClassNames({ 'movie-card__info': !doubleBundle });
  const cardHeroClass = ClassNames({ [`movie-card__${imgClass}`]: doubleBundle });
  const sectionClass = ClassNames('movie-card', { 'movie-card--full': doubleBundle });
  const posterClass = ClassNames("movie-card__poster", { ['movie-card__poster--small']: isCurrentMoviePageReview });
  const wrapClass = ClassNames({ "movie-card__wrap": !isCurrentMoviePageReview });

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

        <Header shouldShowBreadcrumbs={shouldShowBreadcrumbsHeader} />

        <div className={wrapClass}>
          <div className={infoBlockClass}>

            {!isCurrentMoviePage &&
              <div className={posterClass}>
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

            {!isCurrentMoviePageReview &&
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
                  {isCurrentMoviePage && <Link href={bePagesPaths.currentMovieReview.replace('[id]', String(movie.id))}>
                    <a className="btn movie-card__button">Add review</a>
                  </Link>}
                </div>
              </div>}
          </div>
        </div>
      </div>

      {isCurrentMoviePage && <MovieInformation movie_infogmation={movie_information} reviews={reviews} />}
      {isCurrentMoviePageReview && <ReviewForm movieId={movie.id} />}


    </section >
  )
}


export default MovieCover;
