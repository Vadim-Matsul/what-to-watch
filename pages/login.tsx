import { AnyAction } from '@reduxjs/toolkit';
import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Login } from '../page-components/Login/Login';
import { API_ACTIONS } from '../store/labouring/api-actions/api-actions';
import { getAuthStatus } from '../store/reducers/user-reducer/user-slice-selectors';
import { wrapper_Server_Client } from '../store/store';

const LoginPage: NextPage = () => {

  return (
    <Login />
  );
};

export default LoginPage;

export const getStaticProps: GetStaticProps = wrapper_Server_Client.getStaticProps(({ dispatch, getState }) => async ctx => {
  await dispatch(API_ACTIONS.checkAutorization() as unknown as AnyAction);
  await dispatch(API_ACTIONS.fetchMovies() as unknown as AnyAction);

  if (getState().user.authStatus === 'AUTH') {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    }
  }

  return { props: {} }
});