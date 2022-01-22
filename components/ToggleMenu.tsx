import { useEffect, useState } from 'react';
import styles from '@styles/ToggleMenu.module.css';
import Link from 'next/link';

interface Props {
  quan: number;
  toggle: boolean;
}

export default function ToggleMenu({ quan, toggle }: Props) {
  const [show, setShow] = useState(toggle);
  const [ani, setAni] = useState<'in' | 'out' | 'none' | null>('none');

  useEffect(() => {
    if (ani === 'none' && !toggle) {
      setShow(false);
    } else if (ani === 'none' && toggle) {
      setAni('in');
      setShow(true);
    } else if (ani === null && !toggle) {
      setAni('out');
      setShow(true);
    }
  }, [ani, toggle]);

  const aniEnd = () => {
    setAni((prev) => (prev === 'out' ? 'none' : null));
  };

  if (!show) return null;
  return (
    <div
      className={`${styles.smallMenu} ${
        ani === null ? '' : ani === 'in' ? styles.in : styles.out
      }`}
      onAnimationEnd={aniEnd}
    >
      <div className={styles.menuItem}>
        <span>
          ORDER NOW
          <br />
          {'031 ' + '789 ' + '1234'}
        </span>
      </div>
      <div className={styles.menuItem}>
        <span>Products</span>
      </div>
      <div className={styles.menuItem}>
        <span>Menu</span>
      </div>
      <div className={styles.menuItem}>
        <span>Events</span>
      </div>
      <div className={styles.menuItem}>
        <span>Blog</span>
      </div>
      <div className={styles.menuItem}>
        <Link href={`/cart`} passHref>
          <a>
            <span>{`Cart: ${quan}`}</span>
          </a>
        </Link>
      </div>
    </div>
  );
}
