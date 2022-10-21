import { MovieCardProps } from './Movie-Card.props'
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { VideoPlayer } from '../VideoPlayer/VideoPlayer';
import { useRouter } from 'next/router';
import { bePagesPaths } from '../../helpers/const/const';
import classNames from 'classnames';
import { useDrag } from '../hooks/useDrag';

const MovieCard: React.FC<MovieCardProps> = (props) => {
  const { imgTitle, posterImage, id, previewLink, isFavorite } = props;
  const cardRef = useRef<HTMLElement>();

  useDrag(cardRef, isFavorite, id);

  const cardClass = classNames('small-movie-card__link', {
    'draggable': isFavorite
  });

  return (
    <article className='small-movie-card catalog__movies-card' draggable={isFavorite} ref={cardRef} >
      <Link href={bePagesPaths.currentMovie.replace('[id]', String(id))} scroll={false}  >
        <a className={cardClass}>
          <VideoPlayer previewLink={previewLink} posterImage={posterImage} isFavoritesPage />
          <h3 className="small-movie-card__title movie-title-link">{imgTitle}</h3>
        </a>
      </Link >
    </article >
  );
};


export default MovieCard;
