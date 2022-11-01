import withRouter from 'next/router';
import { useSelector } from 'react-redux';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { CurrentMovie_Fulfilled } from '../../../store/reducers/data-reducer/current-slice/current-types';
import { CurrentMovieReview } from '../../../page-components/CurrentMovie_Review/CurrentMovie_Review';
import { API_ACTIONS } from '../../../store/labouring/api-actions/api-actions';
import { bePagesPaths, HTTP, isServer } from '../../../helpers/const/const';
import { getAuthStatus } from '../../../store/reducers/index.selectors';
import { api, wrapper_Server_Client } from '../../../store/store';
import { isAsyncDispatch } from '../../../store/store.types';
import { Movie, Movies } from '../../../types/movies';


interface MovieReviewProps { movie: Movie }

const MovieReview: NextPage<MovieReviewProps> = ({ movie }) => {
  const authStatus = useSelector(getAuthStatus);
  if (authStatus === 'NOAUTH' && !isServer) { withRouter.push(bePagesPaths.main) }

  return <CurrentMovieReview movie={movie} />;
};



export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await api.get<Movies>(HTTP.MOVIES).then(({ data: movies }) =>
    movies.map(movie => ({ params: { id: String(movie.id) } }))
  );

  return {
    paths: paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = wrapper_Server_Client.getStaticProps(
  ({ dispatch, getState }: isAsyncDispatch<CurrentMovie_Fulfilled>) => async ctx => {
    const { payload } = await dispatch(API_ACTIONS.fetchCurrentMovie(ctx.params!.id as string));
    await dispatch(API_ACTIONS.fetchMovies());

    if (getState().data.current.status === 'rejected') {
      return {
        redirect: {
          destination: bePagesPaths.main,
          permanent: true
        }
      };
    }

    return { props: { movie: payload[0] } };

  });

export default MovieReview;