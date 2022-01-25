import Image from 'next/image';
import styles from '@styles/PizzaCard.module.css';

interface Props {
  pizza: products;
}

export default function PizzaCard({ pizza }: Props) {
  const { img, title, prices, desc, _id } = pizza;

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src={img} alt="" layout="fill" objectFit="contain" />
      </div>
      <h1 className={styles.title}>{title}</h1>
      <span className={styles.price}>{`Small: ${prices[0]}￦`}</span>
      <span className={styles.price}>{`Medium: ${prices[1]}￦`}</span>
      <span className={styles.price}>{`Large: ${prices[2]}￦`}</span>
      <p className={styles.desc}>{`${desc.slice(0, 10)}${
        desc.length > 10 ? '...' : ''
      }`}</p>
    </div>
  );
}
