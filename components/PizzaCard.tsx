import Image from 'next/image';
import styles from '@styles/PizzaCard.module.css';
import Link from 'next/link';

interface Props {
  pizza: products;
}

export default function PizzaCard({ pizza }: Props) {
  const { img, title, prices, desc, _id } = pizza;

  return (
    <div className={styles.container}>
      <Link href={`/product/${_id}`} passHref>
        <a>
          <Image src={img} alt="" width="500" height="500" />
          <h1 className={styles.title}>{title}</h1>
          <span
            className={styles.price}
          >{`Small: ${prices[0]}￦, Medium: ${prices[1]}￦, Large: ${prices[2]}￦`}</span>
          <p className={styles.desc}>{desc}</p>
        </a>
      </Link>
    </div>
  );
}
