import { Provider } from 'react-redux';
import { API_ACTIONS } from '../store/labouring/api-actions/api-actions';
import { wrapper_Server_Client } from '../store/store';
import { isAsyncDispatch } from '../store/store.types';
import App from 'next/app'
import '../public/css/main.min.css';
import '../public/css/custom.css';
import { AnyAction } from '@reduxjs/toolkit';
import { isServer } from '../helpers/const/const';


export default function MyApp({ Component, ...rest }) {

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
    </Provider>
  );
};

MyApp.getInitialProps = wrapper_Server_Client.getInitialAppProps(({ dispatch }: isAsyncDispatch) => async ctx => {
  await dispatch(API_ACTIONS.fetchMovies());
  return {
    pageProps: {
      ...(await App.getInitialProps(ctx)),
    }
  }
});
