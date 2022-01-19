import styles from '../styles/Featured.module.css';
import Image from 'next/image';
import { useState } from 'react';

export default function Featured() {
  const [index, setIndex] = useState(0);
  const images = [
    '/img/featured.png',
    '/img/featured2.png',
    '/img/featured3.png',
  ];

  const handleArrow = (type: 'l' | 'r') => {
    if (type === 'l') {
      setIndex((prev) => (prev !== 0 ? prev - 1 : images.length - 1));
    } else if (type === 'r') {
      setIndex((prev) => (prev !== images.length - 1 ? prev + 1 : 0));
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.arrowContainer}
        style={{ left: 0 }}
        onClick={() => handleArrow('l')}
      >
        <Image src="/img/arrowl.png" alt="" layout="fill" objectFit="contain" />
      </div>
      <div
        className={styles.wrapper}
        style={{ transform: `translateX(${-100 * index}vw)` }}
      >
        {images.map((item, idx) => (
          <div className={styles.imgContainer} key={idx}>
            <Image
              src={item}
              alt=""
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
        ))}
      </div>
      <div
        className={styles.arrowContainer}
        style={{ right: 0 }}
        onClick={() => handleArrow('r')}
      >
        <Image src="/img/arrowr.png" alt="" layout="fill" objectFit="contain" />
      </div>
    </div>
  );
}
