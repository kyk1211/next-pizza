import styles from '../styles/Featured.module.css';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

export default function Featured() {
  const [timer, setTimer] = useState<NodeJS.Timer>();
  const [indicater, setIndicater] = useState(0);
  const [index, setIndex] = useState(0);
  const [clone, setClone] = useState([]);
  const [trans, setTrans] = useState('');
  const [time, setTime] = useState(300);
  const images = [
    '/img/featured.png',
    '/img/featured2.png',
    '/img/featured3.png',
  ];
  const len = images.length + 1;

  const handleArrow = useCallback(
    (type: 'l' | 'r') => {
      if (type === 'l') {
        setIndex((prev) => {
          if (prev <= 0) {
            return -1;
          }
          return (prev - 1 + len) % len;
        });
        setTime(300);
      } else if (type === 'r') {
        setIndex((prev) => (prev + 1) % len);
        setTime(300);
      }
    },
    [len]
  );

  useEffect(() => {
    if (timer) {
      clearInterval(timer);
    }
    setTimer(
      setInterval(() => {
        handleArrow('r');
      }, 5000)
    );
    return () => clearInterval(timer as unknown as number);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleArrow]);

  return (
    <>
      <div
        className={styles.container}
        onMouseEnter={() => clearInterval(timer as unknown as number)}
        onMouseLeave={() =>
          setTimer(
            setInterval(() => {
              handleArrow('r');
            }, 5000)
          )
        }
      >
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
      <ul className={styles.indicatorContainer}></ul>
    </>
  );
}
