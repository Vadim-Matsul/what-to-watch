import { useState } from 'react'
import { CurrentMovieNavigation } from '../CurrentMovieNavigation/CurrentMovieNavigation';
import { MovieInformationProps } from './MovieInformation.props'
import { MovieInformationBlock } from './MovieInformationBlock/MovieInformationBlock';
import Image from 'next/image';


export const MovieInformation: React.FC<MovieInformationProps> = (props) => {
  const { movie_infogmation, reviews } = props;

  return (
    <div className="movie-card__wrap movie-card__translate-top">
      <div className="movie-card__info">
        <div className="movie-card__poster movie-card__poster--big">
          <Image
            src={movie_infogmation.posterImage}
            blurDataURL={movie_infogmation.posterImage}
            width={273}
            height={410}
            placeholder='blur'
            alt={movie_infogmation.name}
          />
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