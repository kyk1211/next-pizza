import Head from 'next/head';
import Featured from '../components/Featured';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Pizza</title>
        <meta name="description" content="pizza" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
    </div>
  );
}
