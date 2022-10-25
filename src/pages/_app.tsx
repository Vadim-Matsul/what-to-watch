import { Provider } from 'react-redux';
import { API_ACTIONS } from '../store/labouring/api-actions/api-actions';
import { wrapper_Server_Client } from '../store/store';
import { isAsyncDispatch } from '../store/store.types';
import App, { AppProps } from 'next/app'
import '../../public/css/main.min.css';
import '../../public/css/custom.css';
import 'react-toastify/dist/ReactToastify.css';
import { AnyAction } from '@reduxjs/toolkit';
import { isServer } from '../helpers/const/const';
import { ToastContainer, Flip } from 'react-toastify';


export default function MyApp({ Component, ...rest }: AppProps) {

  const { store, props: { pageProps } } = wrapper_Server_Client.useWrappedStore(rest);

  /**
   * Таким образом исключаем ошибку обновления
   *       при рендеринге компонента
   */
  (async function () {
    if (!isServer) {
      await store.dispatch(API_ACTIONS.checkAutorization() as unknown as AnyAction);
      await store.dispatch(API_ACTIONS.fetchFavorites() as unknown as AnyAction);
    }
  })();

  return (
    <Provider store={store} >
      <Component {...pageProps} />
      <ToastContainer
        position='top-center'
        transition={Flip}
        autoClose={2000}
        theme="dark"
      />
    </Provider>
  );
};

MyApp.getInitialProps = wrapper_Server_Client.getInitialAppProps(({ dispatch }) => async ctx => {
  await dispatch(API_ACTIONS.fetchMovies() as unknown as AnyAction);
  return {
    pageProps: {
      ...(await App.getInitialProps(ctx)),
    }
  }
});
