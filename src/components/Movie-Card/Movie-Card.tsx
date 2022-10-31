import Link from 'next/link';
import classNames from 'classnames';
import React, { useRef } from 'react';
import { useRouter } from 'next/router';

import { bePagesPaths } from '../../helpers/const/const';
import { useDrag } from '../../helpers/Hooks/useDrag';
import { MovieCardProps } from './Movie-Card.props'
import { VideoPlayer } from '..';

export const MovieCard: React.FC<MovieCardProps> = (props) => {
  const { pathname } = useRouter();
  const { imgTitle, posterImage, id, previewLink } = props;
  const cardRef = useRef<HTMLElement>(null);
  const isFavoritesPage = pathname === bePagesPaths.favorite;

  useDrag(cardRef, isFavoritesPage, id);

  const cardClass = classNames('small-movie-card__link', {
    'draggable': isFavoritesPage
  });

  return (
    <article className='small-movie-card catalog__movies-card' draggable={isFavoritesPage} ref={cardRef} data-testid='article'>
      <Link href={bePagesPaths.currentMovie.replace('[id]', String(id))} scroll={false}>
        <a className={cardClass}>
          <VideoPlayer previewLink={previewLink} posterImage={posterImage} isFavoritesPage={isFavoritesPage} />
          <h3 className="small-movie-card__title movie-title-link">{imgTitle}</h3>
        </a>
      </Link>
    </article>
  );
};
