import { RootState } from 'slice/store';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import styles from '@styles/Navbar.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ToggleMenu from './ToggleMenu';

export default function Navbar() {
  const router = useRouter();
  const quan = useSelector((state: RootState) => state.cart.quan);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setToggle(false);
  }, [router.pathname]);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.item}>
          <div className={styles.callButton}>
            <Image
              src="/img/telephone.png"
              alt=""
              width="32px"
              height="32px"
              layout="fixed"
            />
          </div>
          <div className={styles.texts}>
            <div className={styles.text}>ORDER NOW</div>
            <div className={styles.text}>{'031 ' + '789 ' + '1234'}</div>
          </div>
        </div>
        <div className={styles.item}>
          <ul className={styles.list}>
            <Link href="/" passHref>
              <li className={styles.listItem}>
                <a>Home</a>
              </li>
            </Link>
            <li className={styles.listItem}>Products</li>
            <li className={styles.listItem}>Menu</li>
            <li>
              <Image
                src="/img/logo.png"
                alt=""
                width="160px"
                height="69px"
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
                  width="30px"
                  height="30px"
                  layout="fixed"
                />
                <div className={styles.counter}>{quan}</div>
              </div>
            </div>
          </a>
        </Link>
      </div>
      <div className={styles.smallContainer}>
        <div className={styles.smallHead}>
          <Link href="/" passHref>
            <a>
              <Image
                src="/img/logo.png"
                alt=""
                width="100px"
                height="50px"
                layout="fixed"
              />
            </a>
          </Link>
        </div>

        <button className={styles.toggle} onClick={handleToggle}>
          <Image
            src={'/img/hamburger.png'}
            alt=""
            layout="fixed"
            width={30}
            height={30}
          />
        </button>
      </div>
      <ToggleMenu quan={quan} toggle={toggle} />
    </>
  );
}
