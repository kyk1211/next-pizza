import Head from 'next/head';
import Featured from '../components/Featured';
import PizzaList from '../components/PizzaList';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Pizza</title>
        <meta name="description" content="pizza" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <PizzaList />
    </div>
  );
}
