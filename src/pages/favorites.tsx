import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Loader } from '../components/Loader/Loader';
import { bePagesPaths, isServer } from '../helpers/const/const';
import { MyFavoritesList } from '../page-components/Favorites/Favorites';
import { getBasicStatus } from '../store/reducers/data-reducer/basic-slice/basic-slice-selectors';
import { getAuthStatus } from '../store/reducers/user-reducer/user-slice-selectors';


const FavoritePage: NextPage = () => {
  const router = useRouter();
  const authStatus = useSelector(getAuthStatus);
  const basicStatus = useSelector(getBasicStatus);

  if (authStatus === 'NOAUTH' || basicStatus === 'rejected') router.push(bePagesPaths.main);

  return (
    <>
      <MyFavoritesList />
    </>
  )
}

export default FavoritePage;
