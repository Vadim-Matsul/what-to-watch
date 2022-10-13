import { getStringForImg } from '../../helpers/utils/utils'
import { MovieCardProps } from './Movie-Card.props'
import React from 'react';

const MovieCard: React.FC<MovieCardProps> = ({ imgTitle, previewImage, onTitleClick, onCardHover }) => {


  return (
    <article
      className="small-movie-card catalog__movies-card"
    >
      <div className="small-movie-card__image">
        <img src={previewImage} alt={imgTitle} width="280" height="175" />
      </div>
      <h3
        className="small-movie-card__title"
        onClick={onTitleClick}
      >
        <a className="small-movie-card__link" href="movie-page.html">{imgTitle}</a>
      </h3>
    </article>
  );
};


export default MovieCard;