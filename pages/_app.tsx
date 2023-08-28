import { type AppProps } from 'next/app';
import { Global } from '@emotion/react';
import { globalStyles } from '../src/commons/styles/globalStyles';
import ApolloSetting from '../src/components/commons/appllo';
import Layout from '../src/components/commons/layout';
import { RecoilRoot } from 'recoil';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<>
			<div>
				<Head>
					<title>RichCollector</title>
					<link rel="icon" href="/RICH.png" />
					<meta name="description" content="중고거래 웹사이트" />
				</Head>
			</div>
			<RecoilRoot>
				<ApolloSetting>
					<>
						<Global styles={globalStyles} />
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</>
				</ApolloSetting>
			</RecoilRoot>
		</>
	);
}

export default MyApp;
