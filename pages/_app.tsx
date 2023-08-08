import { type AppProps } from "next/app";
import { Global } from "@emotion/react";
import { globalStyles } from "../src/commons/styles/globalStyles";
import ApolloSetting from "../src/components/commons/appllo";
import Layout from "../src/components/commons/layout";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <ApolloSetting>
        <>
          <Global styles={globalStyles} />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </>
      </ApolloSetting>
    </>
  );
}

export default MyApp;
