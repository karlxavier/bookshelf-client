import 'tailwindcss/tailwind.css';
import { SessionProvider } from 'next-auth/react';
import React from "react";
import Wrapper from 'components/wrapper';
import Layout from 'components/layout';

function ClientApp({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    getLayout(
      <SessionProvider options={{clientMaxAge: 0}} session={pageProps.session}>
        <Wrapper>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Wrapper>
      </SessionProvider>
    )
  );
}

export default ClientApp;
