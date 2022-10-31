import { NextPage } from 'next';
import withRouter from 'next/router';
import { useSelector } from 'react-redux';

import { getAuthStatus } from '../store/reducers/index.selectors';
import { bePagesPaths, isServer } from '../helpers/const/const';
import { Login } from '../page-components/Login/Login';
import { Loader } from '../components/Loader/Loader';

const LoginPage: NextPage = () => {

  const authStatus = useSelector(getAuthStatus);
  const isAuth = authStatus === 'AUTH';
  if (isAuth && !isServer) { withRouter.push(bePagesPaths.main) };

  return (
    <>
      {isAuth
        ? <span className='loader_center' >
          <Loader />
        </span>
        : <Login />
      }
    </>
  );
};

export default LoginPage;
