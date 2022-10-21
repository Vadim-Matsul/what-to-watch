import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { bePagesPaths } from '../helpers/const/const';
import { MyFavoritesList } from '../page-components/Favorites/Favorites';
import { getAuthStatus } from '../store/reducers/user-reducer/user-slice-selectors';


const FavoritePage: NextPage = () => {
  const router = useRouter();
  const authStatus = useSelector(getAuthStatus);
  if (authStatus === 'NOAUTH') router.push(bePagesPaths.main);

  return (
    <>
      <MyFavoritesList />
    </>
  )
}

export default FavoritePage;
