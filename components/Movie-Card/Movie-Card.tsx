import { MovieCardProps } from './Movie-Card.props'
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

const MovieCard: React.FC<MovieCardProps> = ({ imgTitle, previewImage, id, onTitleClick, onCardHover }) => {


  return (
    <article
      className="small-movie-card catalog__movies-card"
    >
      <div className="small-movie-card__image">
        <Image
          src={previewImage}
          alt={imgTitle}
          width={280}
          height={175}
          blurDataURL={previewImage}
          placeholder='blur'
        />
      </div>
      <h3
        className="small-movie-card__title"
        onClick={onTitleClick}
      >
        <Link href={`films/${id}`}>
          <a className="small-movie-card__link" >{imgTitle}</a>
        </Link>
      </h3>
    </article>
  );
};


export default MovieCard;