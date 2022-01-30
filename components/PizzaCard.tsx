import Image from 'next/image';
import styles from '@styles/PizzaCard.module.css';
import { useState } from 'react';
import Modal from './Modal';
import Link from 'next/link';
import PizzaCardModal from './PizzaCardModal';

interface Props {
  pizza: products;
}

export default function PizzaCard({ pizza }: Props) {
  const [show, setShow] = useState(false);
  const { img, title, prices, desc, _id, extraOptions } = pizza;

  return (
    <>
      <div className={styles.container} onClick={() => setShow(true)}>
        <div className={styles.imgContainer}>
          <Image src={img} alt="" layout="fill" objectFit="contain" />
        </div>
        <h1 className={styles.title}>{title}</h1>
        <span className={styles.price}>{`Small: ${prices[0]}￦`}</span>
        <span className={styles.price}>{`Medium: ${prices[1]}￦`}</span>
        <span className={styles.price}>{`Large: ${prices[2]}￦`}</span>
      </div>
      <PizzaCardModal pizza={pizza} show={show} setShow={setShow} />
    </>
  );
}
