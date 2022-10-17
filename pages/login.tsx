import { GetStaticProps, NextPage } from 'next';
import { useAppDispatch } from '../helpers/Hooks/useAppDispatch';
import { Login } from '../page-components/Login/Login';
import { API_ACTIONS } from '../store/labouring/api-actions/api-actions';
import { wrapper_Server_Client } from '../store/store';
import { isAsyncDispatch } from '../store/store.types';

const LoginPage: NextPage = () => {
  const dispatch = useAppDispatch();
  dispatch(API_ACTIONS.checkAutorization());

  return (
    <Login />
  );
};

export default LoginPage;

export const getStaticProps: GetStaticProps = wrapper_Server_Client.getStaticProps(({ dispatch, getState }: isAsyncDispatch) => async ctx => {
  await dispatch(API_ACTIONS.checkAutorization());

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