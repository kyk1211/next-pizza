import styles from '../styles/Featured.module.css';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

export default function Featured() {
  const [index, setIndex] = useState(0);
  const [mouse, setMouse] = useState(false);
  const [auto, setAuto] = useState<ReturnType<typeof setTimeout>>();
  const images = [
    '/img/featured.png',
    '/img/featured2.png',
    '/img/featured3.png',
  ];

  const handleArrow = useCallback(
    (type: 'l' | 'r') => {
      if (type === 'l') {
        setIndex((prev) => (prev !== 0 ? prev - 1 : images.length - 1));
      } else if (type === 'r') {
        setIndex((prev) => (prev !== images.length - 1 ? prev + 1 : 0));
      }
    },
    [images.length]
  );

  useEffect(() => {
    if (auto) {
      clearTimeout(auto);
    }
    if (!mouse) {
      const timer = setTimeout(() => {
        handleArrow('r');
      }, 5000);
      setAuto(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleArrow, mouse, index]);

  return (
    <>
      <div
        className={styles.container}
        onMouseEnter={() => setMouse(true)}
        onMouseLeave={() => setMouse(false)}
      >
        <div
          className={styles.arrowContainer}
          style={{ left: 0 }}
          onClick={() => handleArrow('l')}
        >
          <div style={{ position: 'relative', height: '100px' }}>
            <Image
              src="/img/arrowl.png"
              alt=""
              layout="fill"
              objectFit="contain"
            />
          </div>
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
          <div style={{ position: 'relative', height: '100px' }}>
            <Image
              src="/img/arrowr.png"
              alt=""
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
      <ul className={styles.indicatorContainer}>
        {images.map((_, idx) =>
          idx !== index ? (
            <li
              key={idx}
              className={styles.indicator}
              onClick={() => setIndex(idx)}
            >
              ◉
            </li>
          ) : (
            <li
              key={idx}
              className={styles.indicator}
              onClick={() => setIndex(idx)}
            >
              ◎
            </li>
          )
        )}
      </ul>
    </>
  );
}
