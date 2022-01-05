import Head from 'next/head';
import Featured from '@components/Featured';
import PizzaList from '@components/PizzaList';
import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export default function Home({
  pizzaList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <Head>
        <title>Pizza</title>
        <meta name="description" content="pizza" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <PizzaList pizzaList={pizzaList} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await axios.get('http://localhost:3000/api/products');

  return {
    props: {
      pizzaList: res.data,
    },
  };
};
