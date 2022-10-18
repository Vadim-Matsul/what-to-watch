import { NextPage } from 'next';
import { useSelector } from 'react-redux';
import { bePagesPaths, isServer } from '../helpers/const/const';
import { Login } from '../page-components/Login/Login';
import { getAuthStatus } from '../store/reducers/user-reducer/user-slice-selectors';
import withRouter from 'next/router';
import { Loader } from '../components/Loader/Loader';
import { useEffect, useState } from 'react';

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
