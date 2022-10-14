import Image from 'next/image';
import { useRouter } from 'next/router';
import { Header } from '../Header/Header';
import ClassNames from 'classnames';
import { bePagesPaths } from '../../helpers/const/const';
import { MovieCoverProps } from './MoverCover.props';
import { MovieInformation } from '../MovieInformation/MovieInformation';
import { convertInMovieInformation } from '../../helpers/adapter/adapter';

const movie: React.FC<MovieCoverProps> = ({ movie }) => {

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
                <button className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
                {isCurrentMoviePage && <a href="add-review.html" className="btn movie-card__button">Add review</a>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isCurrentMoviePage && <MovieInformation movie_infogmation={movie_information} />}

    </section>
  )
}

export default movie;
