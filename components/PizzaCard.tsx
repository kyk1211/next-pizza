import Image from 'next/image';
import styles from '@styles/PizzaCard.module.css';
import { useRouter } from 'next/router';

interface Props {
  pizza: products;
}

export default function PizzaCard({ pizza }: Props) {
  const { img, title, prices, desc, _id } = pizza;
  const router = useRouter();
  const handleClick = () => {
    router.push(`/product/${_id}`);
  };
  return (
    <div className={styles.container} onClick={handleClick}>
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
