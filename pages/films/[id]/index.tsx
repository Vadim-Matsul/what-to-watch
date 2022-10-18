import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { bePagesPaths, HTTP, testApi } from '../../../helpers/const/const';
import CurrentMovie from '../../../page-components/CurrentMovie/CurrentMovie';
import { API_ACTIONS } from '../../../store/labouring/api-actions/api-actions';
import { CurrentMovie_Fulfilled } from '../../../store/reducers/data-reducer/current-slice/current-types';
import { api, wrapper_Server_Client } from '../../../store/store';
import { isAsyncDispatch } from '../../../store/store.types';
import { Movie, Movies } from '../../../types/movies';
import { Reviews } from '../../../types/reviews';

type MoviePageProps = { movie: Movie, reviews: Reviews };

const MoviePage: NextPage<MoviePageProps> = ({ movie, reviews }) => (
  <>
    <CurrentMovie
      currentMovie={movie}
      currentReviews={reviews}
    />
  </>
);


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
      ({
        redirect: {
          destination: bePagesPaths.main,
          permanent: true
        }
      });
    }

    return {
      props: {
        movie: payload[0],
        reviews: payload[1],
      }
    }
  });

export default MoviePage;
