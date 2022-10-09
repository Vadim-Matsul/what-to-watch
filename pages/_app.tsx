import { AppProps } from 'next/app';
import '../public/css/main.min.css';

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <Component {...pageProps} />
    </>
  )

}