import { getStringForImg } from '../../helpers/helpers'
import { MovieCardProps } from './Movie-Card.props'
import React from 'react';

const MovieCard: React.FC<MovieCardProps> = ({ img_title, onTitleClick }) => {

  const img_url = getStringForImg(img_title);

  return (
    <article className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image">
        <img src={`img/${img_url}.jpg`} alt={img_title} width="280" height="175" />
      </div>
      <h3
        className="small-movie-card__title"
        onClick={onTitleClick}
      >
        <a className="small-movie-card__link" href="movie-page.html">{img_title}</a>
      </h3>
    </article>
  );
};

export default MovieCard;