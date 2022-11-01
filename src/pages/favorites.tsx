import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { getAuthStatus, getBasicStatus } from '../store/reducers/index.selectors';
import { MyFavoritesList } from '../page-components/Favorites/Favorites';
import { API_ACTIONS } from '../store/labouring/api-actions/api-actions';
import { wrapper_Server_Client } from '../store/store';
import { bePagesPaths } from '../helpers/const/const';


const FavoritePage: NextPage = () => {
  const router = useRouter();
  const authStatus = useSelector(getAuthStatus);
  const basicStatus = useSelector(getBasicStatus);

  if (authStatus === 'NOAUTH' || basicStatus === 'rejected') router.push(bePagesPaths.main);

  return <MyFavoritesList />;
}

FavoritePage.getInitialProps = wrapper_Server_Client.getInitialPageProps(({ dispatch }) => async ctx => {
  await dispatch(API_ACTIONS.fetchMovies());
});

export default FavoritePage;
