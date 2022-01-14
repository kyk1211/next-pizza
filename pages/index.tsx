import Head from 'next/head';
import Featured from '@components/Featured';
import PizzaList from '@components/PizzaList';
import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useState } from 'react';
import Add from '@components/Add';
import AddButton from '@components/AddButton';

export default function Home({
  pizzaList,
  admin,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [close, setClose] = useState(false);

  return (
    <div>
      <Head>
        <title>Pizza</title>
        <meta name="description" content="pizza" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {admin && <AddButton setClose={setClose} />}
      <PizzaList pizzaList={pizzaList} />
      {!close && <Add setClose={setClose} />}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const myCookie = ctx.req.cookies || '';
  let admin = false;
  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const res = await axios.get('http://localhost:3000/api/products');

  return {
    props: {
      pizzaList: res.data,
      admin,
    },
  };
};
