import Image from 'next/image';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/bg.png" objectFit="cover" layout="fill" alt="" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            oh yes, we did. the lama pizza, well baked slice of pizza
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>find our restaurant</h1>
          <p className={styles.text}>
            1654 R. Don Road #304.
            <br /> NewYork, 85022
            <br /> (602) 867-1010
          </p>
          <p className={styles.text}>
            1654 R. Don Road #304.
            <br /> NewYork, 85022
            <br /> (602) 867-1010
          </p>
          <p className={styles.text}>
            1654 R. Don Road #304.
            <br /> NewYork, 85022
            <br /> (602) 867-1010
          </p>
          <p className={styles.text}>
            1654 R. Don Road #304.
            <br /> NewYork, 85022
            <br /> (602) 867-1010
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>Working Hours</h1>
          <p className={styles.text}>
            moday until friday
            <br /> 9:00 - 22:00
          </p>
          <p className={styles.text}>
            saturday - sunday
            <br /> 12:00 - 24:00
          </p>
        </div>
      </div>
    </div>
  );
}
