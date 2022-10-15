import { useState } from 'react'
import { CurrentMovieNavigation } from '../CurrentMovieNavigation/CurrentMovieNavigation';
import { MovieInformationProps } from './MovieInformation.props'
import { MovieInformationBlock } from './MovieInformationBlock/MovieInformationBlock';



export const MovieInformation: React.FC<MovieInformationProps> = (props) => {
  const { movie_infogmation, reviews } = props;

  return (
    <div className="movie-card__wrap movie-card__translate-top">
      <div className="movie-card__info">
        <div className="movie-card__poster movie-card__poster--big">
          <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
        </div>

        <div className="movie-card__desc">

          <CurrentMovieNavigation />

          <MovieInformationBlock
            movie_infogmation={movie_infogmation}
            reviews={reviews}
          />

        </div>
      </div>
    </div>
  )
}