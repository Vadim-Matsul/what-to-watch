import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { API_ACTIONS } from '../store/labouring/api-actions/api-actions';
import { wrapper_Server_Client } from '../store/store';
import { isAsyncDispatch } from '../store/store.types';
import { FetchMovies_Fulfilled } from '../store/reducers/data-reducer/basic-slice/basic-types';
import App from 'next/app'
import '../public/css/main.min.css';

const MyApp: NextPage<AppProps> = ({ Component, ...rest }) => {

  const { store, props: { pageProps } } = wrapper_Server_Client.useWrappedStore(rest);

  return (
    <Provider store={store} >
      <Component {...pageProps} />
    </Provider>
  )
}

MyApp.getInitialProps = wrapper_Server_Client.getInitialAppProps(({ dispatch }: isAsyncDispatch) => async (AppProps) => {

  await dispatch(API_ACTIONS.fetchMovies());

  const pageProps = {
    ...(await App.getInitialProps(AppProps)).pageProps,
  };

  return { pageProps };
});

export default MyApp;


