import Link from 'next/link';
import { useEffect, useState } from 'react';

import { bePagesPaths } from '../../helpers/const/const';
import { MovieListProps } from './Movie-List.props';
import { MovieCard } from '..';

const MovieList: React.FC<MovieListProps> = ({ movies, isFavorite = false }) => {

  const [ind, setInd] = useState<number>(4);
  const shouldShowEmpty = isFavorite && !movies.length;

  useEffect(() => {
    if (typeof window !== 'undefined') {

      const observer = new IntersectionObserver((entries, observer) => {
        if (entries[0] && entries[0].isIntersecting) {
          setInd(prev => prev += 4);
          observer.unobserve(entries[0].target);
        }
      }, { root: null, threshold: [0.1, 0.3, 0.7, 1], rootMargin: '40px' });

      ind >= movies.length
        ? observer.disconnect()
        : observer.observe(document.getElementById('showMore')!);
    }
  }, [ind, movies]);


  return (
    <>
      <div className="catalog__movies-list" >
        {movies.slice(0, ind).map(movie =>
          <MovieCard
            key={movie.id}
            imgTitle={movie.name}
            posterImage={movie.previewImage}
            previewLink={movie.previewVideoLink}
            id={movie.id}
          />)}
      </div>
      {shouldShowEmpty &&
        <Link href={bePagesPaths.main}>
          <a className='btn' >
            <span className='text-center' >
              ADD MOVIES
            </span>
          </a>
        </Link>
      }
      <div id='showMore' className='show-more' data-testid='showMore' />
    </>
  );
};

export default MovieList;
