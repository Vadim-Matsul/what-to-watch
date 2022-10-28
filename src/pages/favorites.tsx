import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { bePagesPaths } from '../helpers/const/const';
import { MyFavoritesList } from '../page-components/Favorites/Favorites';
import { getAuthStatus, getBasicStatus } from '../store/reducers/index.selectors';


const FavoritePage: NextPage = () => {
  const router = useRouter();
  const authStatus = useSelector(getAuthStatus);
  const basicStatus = useSelector(getBasicStatus);

  if (authStatus === 'NOAUTH' || basicStatus === 'rejected') router.push(bePagesPaths.main);

  return <MyFavoritesList />
}

export default FavoritePage;
