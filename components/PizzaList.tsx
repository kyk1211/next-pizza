import styles from '../styles/PizzaList.module.css';
import PizzaCard from './PizzaCard';

interface Props {
  pizzaList: products[];
}

export default function PizzaList({ pizzaList }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <h1 className={styles.title}>윤구의 피자가게</h1>
        <p className={styles.desc}>피자는 둥글고 맛있다.</p>
      </div>
      <div className={styles.wrapper}>
        {pizzaList.map((item) => (
          <PizzaCard key={item._id} pizza={item} />
        ))}
      </div>
    </div>
  );
}
