import { AnyAction } from '@reduxjs/toolkit';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { HTTP } from '../../helpers/const/const';
import CurrentMovie from '../../page-components/CurrentMovie/CurrentMovie';
import { API_ACTIONS } from '../../store/labouring/api-actions/api-actions';
import { api, wrapper_Server_Client } from '../../store/store';
import { Movie, Movies } from '../../types/movies';
import { Reviews } from '../../types/reviews';

interface MoviePageProps { movie: Movie, reviews: Reviews };

const MoviePage: NextPage<MoviePageProps> = ({ movie, reviews }) => {

  return (
    <CurrentMovie
      currentMovie={movie}
      currentReviews={reviews}
    />
  );
};

export default MoviePage;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: movies } = await api.get<Movies>(HTTP.MOVIES);
  const potentially_paths = movies.map(movie => ({ params: { id: String(movie.id) } }))

  return {
    paths: potentially_paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<MoviePageProps> = wrapper_Server_Client.getStaticProps(
  ({ dispatch, getState }) => async ({ params: { id } }) => {

    await dispatch(API_ACTIONS.fetchCurrentMovie(id as string) as unknown as AnyAction);
    await dispatch(API_ACTIONS.fetchMovies() as unknown as AnyAction);


    if (getState().data.current.status === 'rejected') {
      return {
        redirect: {
          destination: '/',
          permanent: true
        }
      }
    }

    const current_movie = getState().data.current.current_movie;
    const current_reviews = getState().data.current.current_movie_reviews;

    return {
      props: {
        movie: current_movie,
        reviews: current_reviews
      }
    }
  });
