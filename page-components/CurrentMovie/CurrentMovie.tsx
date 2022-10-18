import { useSelector } from 'react-redux';
import { Footer } from '../../components/Footer/Footer';
import { MoreLikesMovies } from '../../components/MoreLikesMovies/MoreLikesMovies';
import MovieCover from '../../components/MovieCover/MovieCover';
import { CurrentMovieProps } from './CurrentMovie.props';

const CurrentMovie: React.FC<CurrentMovieProps> = ({ currentMovie, currentReviews }) => {
  

  return (
    <>
      <MovieCover
        movie={currentMovie}
        reviews={currentReviews}
      />
      <div className="page-content">
        <MoreLikesMovies
          curent_movie_id={currentMovie.id}
          curent_movie_genre={currentMovie.genre}
        />
        <Footer />
      </div>
    </>
  )
}

export default CurrentMovie;
