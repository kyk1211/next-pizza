import styles from '../styles/PizzaList.module.css';
import PizzaCard from './PizzaCard';

export default function PizzaList() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>The best pizza in town</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ex
        eros, ornare vitae suscipit pharetra, imperdiet ut quam. Sed eu volutpat
        ex. Etiam neque quam, iaculis nec tellus a, maximus ornare ipsum. Cras
        tempus vitae ligula eget ornare.
      </p>
      <div className={styles.wrapper}>
        <PizzaCard />
        <PizzaCard />
        <PizzaCard />
        <PizzaCard />
        <PizzaCard />
        <PizzaCard />
        <PizzaCard />
        <PizzaCard />
        <PizzaCard />
      </div>
    </div>
  );
}
