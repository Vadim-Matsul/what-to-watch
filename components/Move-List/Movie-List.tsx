import { MovieListProps } from './Movie-List.props';
import MovieCard from '../Movie-Card/Movie-Card';
import { useSelector } from 'react-redux';
import { getSortedMovies } from '../../store/reducers/data-reducer/basic-slice/basic-slice-selectors';
import { getActiveGenre } from '../../store/reducers/app-reducer/app-slice-selectors';
import { useEffect, useState } from 'react';
import { ALL_GENRES, isServer } from '../../helpers/const/const';
import Link from 'next/link';
import { bePagesPaths } from '../../helpers/const/const';

const MovieList: React.FC<MovieListProps> = ({ movies, isFavorite = false }) => {

  const [ind, setInd] = useState<number>(4);
  const shouldShowEmpty = isFavorite && !movies.length

  console.log(ind);


  useEffect(() => {
    if (typeof window !== 'undefined') {

      const observer = new IntersectionObserver((entries, observer) => {

        if (entries[0].isIntersecting) {
          setInd(prev => prev += 4);
          observer.unobserve(entries[0].target);
        }
      }, { root: null, threshold: [0.1, 0.3, 0.7, 1], rootMargin: '40px' });

      ind >= movies.length
        ? observer.disconnect()
        : observer.observe(document.getElementById('showMore'));
    }
  }, [ind, movies])


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
            isFavorite={isFavorite}
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
      <div id='showMore' className='show-more' />
    </>
  );
};


export default MovieList;