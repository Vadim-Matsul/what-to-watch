import { MovieListProps } from './Movie-List.props';
import MovieCard from '../Movie-Card/Movie-Card';
import { useSelector } from 'react-redux';
import { getSortedMovies } from '../../store/reducers/data-reducer/basic-slice/basic-slice-selectors';
import { getActiveGenre } from '../../store/reducers/app-reducer/app-slice-selectors';
import { useEffect, useState } from 'react';
import { ALL_GENRES } from '../../helpers/const/const';


const MovieList: React.FC<MovieListProps> = () => {

  const [ind, setInd] = useState<number>(4);

  const active_genre = useSelector(getActiveGenre);
  const moviesList = useSelector(getSortedMovies);
  const sortedMovies = moviesList[active_genre];

  const onTitleClick = (evt) => {
    evt.preventDefault();
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {

      const observer = new IntersectionObserver((entries, observer) => {

        if (entries[0].isIntersecting) {
          setInd(prev => prev += 4);
          observer.unobserve(entries[0].target);
        }
      }, { root: null, rootMargin: '100px' });

      ind >= moviesList[ALL_GENRES].length
        ? observer.disconnect()
        : observer.observe(document.getElementById('showMore'));
    }
  }, [ind])




  return (
    <>
      <div className="catalog__movies-list" >
        {sortedMovies.slice(0, ind).map(movie =>
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