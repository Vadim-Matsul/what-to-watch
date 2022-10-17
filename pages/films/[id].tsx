import { AnyAction } from '@reduxjs/toolkit';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HTTP } from '../../helpers/const/const';
import { useAppDispatch } from '../../helpers/Hooks/useAppDispatch';
import CurrentMovie from '../../page-components/CurrentMovie/CurrentMovie';
import { API_ACTIONS } from '../../store/labouring/api-actions/api-actions';
import { api, wrapper_Server_Client } from '../../store/store';
import { isAsyncDispatch } from '../../store/store.types';
import { Movie, Movies } from '../../types/movies';
import { Reviews } from '../../types/reviews';

type MoviePageProps = { movie: Movie, reviews: Reviews };

const MoviePage: NextPage<MoviePageProps> = ({ movie, reviews }) => {
  const dispatch = useAppDispatch();
  dispatch(API_ACTIONS.checkAutorization());

  return (
    <CurrentMovie
      currentMovie={movie}
      currentReviews={reviews}
    />
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: movies } = await api.get<Movies>(HTTP.MOVIES);
  const potentially_paths = movies.map(movie => ({ params: { id: String(movie.id) } }));

  return {
    paths: potentially_paths,
    fallback: false
  }
}



export const getStaticProps: GetStaticProps<MoviePageProps> = wrapper_Server_Client.getStaticProps(
  ({ dispatch, getState }: isAsyncDispatch) => async (ctx) => {
    await dispatch(API_ACTIONS.fetchCurrentMovie(ctx.params.id as string));

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

export default MoviePage;
