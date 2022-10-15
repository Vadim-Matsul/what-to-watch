import { MovieListProps } from './Movie-List.props';
import MovieCard from '../Movie-Card/Movie-Card';
import { useSelector } from 'react-redux';
import { getSortedMovies } from '../../store/reducers/data-reducer/basic-slice/basic-slice-selectors';
import { getActiveGenre } from '../../store/reducers/app-reducer/app-slice-selectors';
import { useEffect, useState } from 'react';
import { ALL_GENRES } from '../../helpers/const/const';


const MovieList: React.FC<MovieListProps> = ({ movies }) => {

  const [ind, setInd] = useState<number>(4);

  useEffect(() => {
    if (typeof window !== 'undefined') {

      const observer = new IntersectionObserver((entries, observer) => {

        if (entries[0].isIntersecting) {
          setInd(prev => prev += 4);
          observer.unobserve(entries[0].target);
        }
      }, { root: null, rootMargin: '100px' });

      ind >= movies.length
        ? observer.disconnect()
        : observer.observe(document.getElementById('showMore'));
    }
  }, [ind])




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
      <div id='showMore' />
    </>
  );
};


export default MovieList;