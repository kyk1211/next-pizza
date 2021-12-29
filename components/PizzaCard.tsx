import Image from 'next/image';
import styles from '../styles/PizzaCard.module.css';

export default function PizzaCard() {
  return (
    <div className={styles.container}>
      <Image src="/img/pizza.png" alt="" width="500" height="500" />
      <h1 className={styles.title}>PIZZA</h1>
      <span className={styles.price}>$50,000</span>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
    </div>
  );
}
