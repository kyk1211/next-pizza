import Image from 'next/image';
import styles from '@styles/PizzaCard.module.css';
import { products } from 'types';
import Link from 'next/link';

interface Props {
  pizza: products;
}

export default function PizzaCard({ pizza }: Props) {
  const { img, title, prices, extraOptions, desc, _id } = pizza;
  return (
    <div className={styles.container}>
      <Link href={`/product/${_id}`} passHref>
        <Image src={img} alt="" width="500" height="500" />
      </Link>
      <h1 className={styles.title}>{title}</h1>
      <span className={styles.price}>{prices[0]}원</span>
      <p className={styles.desc}>{desc}</p>
    </div>
  );
}
