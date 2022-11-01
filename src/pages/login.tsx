import { NextPage } from 'next';
import withRouter from 'next/router';
import { useSelector } from 'react-redux';

import { API_ACTIONS } from '../store/labouring/api-actions/api-actions';
import { getAuthStatus } from '../store/reducers/index.selectors';
import { bePagesPaths, isServer } from '../helpers/const/const';
import { wrapper_Server_Client } from '../store/store';
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

LoginPage.getInitialProps = wrapper_Server_Client.getInitialPageProps(({ dispatch }) => async ctx => {
  await dispatch(API_ACTIONS.fetchMovies());
});

export default LoginPage;
