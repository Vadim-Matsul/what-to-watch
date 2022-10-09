import { Head, Html, Main, NextScript } from 'next/document';
import { VisuallyHidden } from '../components';

export default function MyDocument(): JSX.Element {
  return (
    <Html lang='ru' >
      <Head>
      </Head>
      <body>
        <VisuallyHidden />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};
