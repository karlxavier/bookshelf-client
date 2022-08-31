import 'tailwindcss/tailwind.css';
import { SessionProvider } from 'next-auth/react';
import React from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    getLayout(
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    )
  );
}

export default MyApp;