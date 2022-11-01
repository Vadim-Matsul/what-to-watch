import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { CurrentMovie_Fulfilled } from '../../store/reducers/data-reducer/current-slice/current-types';
import { API_ACTIONS } from '../../store/labouring/api-actions/api-actions';
import MoviePlayer from '../../page-components/MoviePlayer/MoviePlayer';
import { api, wrapper_Server_Client } from '../../store/store';
import { bePagesPaths, HTTP } from '../../helpers/const/const';
import { isAsyncDispatch } from '../../store/store.types';
import { Movie, Movies } from '../../types/movies';


interface MoviePlayerPageProps { movie: Movie }

const MoviePlayerPage: NextPage<MoviePlayerPageProps> = ({ movie }) => <MoviePlayer movie={movie} />;



export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await api.get<Movies>(HTTP.MOVIES).then(
    ({ data: movies }) => movies.map(movie => ({ params: { id: String(movie.id) } })));

  return {
    paths: paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps<MoviePlayerPageProps | {}> = wrapper_Server_Client.getStaticProps(
  ({ dispatch, getState }: isAsyncDispatch<CurrentMovie_Fulfilled>) => async ctx => {
    const [Movie] = (await dispatch(API_ACTIONS.fetchCurrentMovie(ctx.params!.id as string))).payload;
    await dispatch(API_ACTIONS.fetchMovies());

    if (getState().data.current.status === 'rejected') {
      return {
        redirect: {
          destination: bePagesPaths.main,
          permanent: true,
        }
      };
    }

    return { props: { movie: Movie } }
  });

export default MoviePlayerPage;
