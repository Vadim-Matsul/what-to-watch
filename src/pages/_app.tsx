import { Provider } from 'react-redux';
import App, { AppProps } from 'next/app'
import { ToastContainer, Flip } from 'react-toastify';

import { API_ACTIONS } from '../store/labouring/api-actions/api-actions';
import { wrapper_Server_Client } from '../store/store';
import { isServer } from '../helpers/const/const';

import 'react-toastify/dist/ReactToastify.css';
import '../../public/css/main.min.css';
import '../../public/css/custom.css';


export default function MyApp({ Component, ...rest }: AppProps) {

  const { store, props: { pageProps } } = wrapper_Server_Client.useWrappedStore(rest);

  /**
   * Исключаем ошибку обновления
   *   при рендеринге компонента
   */
  (async function () {
    if (!isServer) {
      await store.dispatch(API_ACTIONS.checkAutorization());
      await store.dispatch(API_ACTIONS.fetchFavorites());
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
  await dispatch(API_ACTIONS.fetchMovies());
  return {
    pageProps: {
      ...(await App.getInitialProps(ctx)),
    }
  }
});
