import { MovieCardProps } from './Movie-Card.props'
import React from 'react';
import Link from 'next/link';
import { VideoPlayer } from '../VideoPlayer/VideoPlayer';

const MovieCard: React.FC<MovieCardProps> = (props) => {
  const { imgTitle, posterImage, id, previewLink } = props;

  return (
    <article className="small-movie-card catalog__movies-card" >
      <Link href={`/films/${id}`} scroll={false} >
        <a className="small-movie-card__link" >
          <VideoPlayer previewLink={previewLink} posterImage={posterImage} />
          <h3 className="small-movie-card__title">{imgTitle}</h3>
        </a>
      </Link>
    </article>
  );
};


export default MovieCard;