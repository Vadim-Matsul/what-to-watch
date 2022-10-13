import { MovieListProps } from './Movie-List.props';
import MovieCard from '../Movie-Card/Movie-Card';
import { useSelector } from 'react-redux';
import { getMovies } from '../../store/reducers/data-reducer/basic-slice/basic-slice-selectors';
import { getMoviesList } from '../../helpers/utils/utils';
import { getActiveGenre } from '../../store/reducers/app-reducer/app-slice-selectors';
import { useMemo, useState } from 'react';


const MovieList: React.FC<MovieListProps> = () => {

  const [ind, setInd] = useState<number>(4)

  const movies = useSelector(getMovies);
  const active_genre = useSelector(getActiveGenre);
  const moviesList = useMemo(() => getMoviesList(movies), [movies])
  const sortedMovies = moviesList[active_genre]

  const onTitleClick = (evt) => {
    evt.preventDefault();
  }

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


  return (
    <>
      <div className="catalog__movies-list" >
        {sortedMovies.slice(0, ind).map(movie =>
          <MovieCard
            key={movie.id}
            imgTitle={movie.name}
            previewImage={movie.previewImage}
            onTitleClick={onTitleClick}
            onCardHover={() => { }}
          />)}
      </div>
      <div id='showMore' />
    </>
  );
};


export default MovieList;