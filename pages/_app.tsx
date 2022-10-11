import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import '../public/css/main.min.css';
import { wrapper_Server_Client } from '../store/store';

export default function App({ Component, ...rest }: AppProps) {

  const { store, props: { pageProps } } = wrapper_Server_Client.useWrappedStore(rest);

  return (
    <Provider store={store} >
      <Component {...pageProps} />
    </Provider>
  );
};
