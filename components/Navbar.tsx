import { RootState } from 'slice/store';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import styles from '@styles/Navbar.module.css';
import Link from 'next/link';

export default function Navbar() {
  const quan = useSelector((state: RootState) => state.cart.quan);
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image
            src="/img/telephone.png"
            alt=""
            width={32}
            height={32}
            layout="fixed"
          />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW</div>
          <div className={styles.text}>031 000 000</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <li className={styles.listItem}>Homepage</li>
          <li className={styles.listItem}>Products</li>
          <li className={styles.listItem}>Menu</li>
          <li>
            <Image
              src="/img/logo.png"
              alt=""
              width={160}
              height={69}
              layout="fixed"
            />
          </li>
          <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Contact</li>
        </ul>
      </div>
      <Link href={`/cart`} passHref>
        <a>
          <div className={styles.item}>
            <div className={styles.cart}>
              <Image
                src="/img/cart.png"
                alt=""
                width={30}
                height={30}
                layout="fixed"
              />
              <div className={styles.counter}>{quan}</div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
