import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { bePagesPaths, HTTP, isServer, testApi } from '../../../helpers/const/const';
import { useAppDispatch } from '../../../helpers/Hooks/useAppDispatch';
import CurrentMovie from '../../../page-components/CurrentMovie/CurrentMovie';
import { API_ACTIONS } from '../../../store/labouring/api-actions/api-actions';
import { CurrentMovie_Fulfilled } from '../../../store/reducers/data-reducer/current-slice/current-types';
import { getAuthStatus } from '../../../store/reducers/user-reducer/user-slice-selectors';
import { api, wrapper_Server_Client } from '../../../store/store';
import { isAsyncDispatch } from '../../../store/store.types';
import { Movie, Movies } from '../../../types/movies';
import { Reviews } from '../../../types/reviews';

type MoviePageProps = { movie: Movie, reviews: Reviews };


const MoviePage: NextPage<MoviePageProps> = ({ movie, reviews }) => {

  const [reviewsState, setReviewsState] = useState<Reviews>(reviews);

  const dispatch = useAppDispatch();
  const authStatus = useSelector(getAuthStatus);

  async function fetchMovieWithAuthUser() {
    const { payload }: CurrentMovie_Fulfilled = await dispatch(API_ACTIONS.fetchCurrentMovie(String(movie.id)));
    setReviewsState(payload[1]);
  }

  useEffect(() => {
    if (authStatus === 'AUTH') { fetchMovieWithAuthUser() }
  }, [authStatus])

  return (
    <>
      <CurrentMovie
        currentMovie={movie}
        currentReviews={reviewsState}
      />
    </>
  );
};



export const getStaticPaths: GetStaticPaths = async () => {
  const { data: movies } = await api.get<Movies>(HTTP.MOVIES);
  const potentially_paths = movies.map(movie => ({ params: { id: String(movie.id) } }));

  return {
    paths: potentially_paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<MoviePageProps> = wrapper_Server_Client.getStaticProps(
  ({ dispatch, getState }: isAsyncDispatch<CurrentMovie_Fulfilled>) => async (ctx) => {
    const { payload } = await dispatch(API_ACTIONS.fetchCurrentMovie(ctx.params.id as string));

    if (getState().data.current.status === 'rejected') {

      return {
        redirect: {
          destination: bePagesPaths.main,
          permanent: true
        }
      };
    }

    return {
      props: {
        movie: payload[0],
        reviews: payload[1],
      }
    }
  });

export default MoviePage;
