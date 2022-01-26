import PizzaCard from '@components/PizzaCard';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import styles from '@styles/Search.module.css';
import Loading from '@components/Loading';
import SearchInput from '@components/SearchInput';

export default function Search({ pizzaList }: { pizzaList: products[] }) {
  const [key, setKey] = useState('');
  const [list, setList] = useState(pizzaList);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setList(pizzaList.filter((item) => item.title.includes(key)));
      setLoading(false);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [key, pizzaList]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Products</h1>
      <div className={styles.inputContainer}>
        <SearchInput value={key} setValue={setKey} />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.wrapper}>
          {list.map((item) => (
            <PizzaCard key={item._id} pizza={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await axios.get(`${process.env.DOMAIN}/api/products`);
  const products = res.data;
  return {
    props: {
      pizzaList: products,
    },
  };
};
