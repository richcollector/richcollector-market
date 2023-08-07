import MarketMain from "../src/components/units/main";
import Head from "next/head";

export default function Home(): JSX.Element {
  return (
    <>
      <div>
        <Head>
          <title>RichCollector</title>
          <link rel="icon" href="/RICH.png" />
          <meta name="description" content="중고거래 웹사이트" />
        </Head>
      </div>
      <MarketMain />
    </>
  );
}
