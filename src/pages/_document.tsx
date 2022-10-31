import { Head, Html, Main, NextScript } from 'next/document';
import { VisuallyHidden } from '../components'
import React from 'react';

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
