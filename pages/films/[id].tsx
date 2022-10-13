import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { HTTP } from '../../helpers/const/const';
import CurrentMovie from '../../page-components/CurrentMovie/CurrentMovie';
import { API_ACTIONS } from '../../store/labouring/api-actions/api-actions';
import { api, wrapper_Server_Client } from '../../store/store';
import { Movies } from '../../types/movies';

const MoviePage: NextPage = () => {


  return (
    <>
      <CurrentMovie />
    </>
  )
}

export default MoviePage;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: movies } = await api.get<Movies>(HTTP.MOVIES);
  const potentially_paths = movies.map(movie => ({ params: { id: String(movie.id) } }))

  return {
    paths: potentially_paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = wrapper_Server_Client.getStaticProps(({ dispatch }) => async ({ params: { id } }) => {
  await dispatch(API_ACTIONS.fetchCurrentMovie(id as string));

  return { props: {} }
});
