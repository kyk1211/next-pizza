import styles from '../styles/Featured.module.css';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

export default function Featured() {
  const [timer, setTimer] = useState(0);
  const [indicater, setIndicater] = useState(0);
  const [index, setIndex] = useState(0);
  const [clone, setClone] = useState<string[]>([]);
  const [trans, setTrans] = useState('translateX(-100%)');
  const [time, setTime] = useState(500);
  const [images, _] = useState([
    '/img/featured.png',
    '/img/featured2.png',
    '/img/featured3.png',
  ]);
  const len = images.length + 1;

  const cloneSlide = (slide: string[]) => {
    let first = slide[0];
    let last = slide[slide.length - 1];
    return [last, ...slide, first];
  };

  const handleArrow = useCallback(
    (type: 'l' | 'r') => {
      if (type === 'l') {
        setIndex((prev) => {
          if (prev <= 0) {
            return -1;
          }
          return (prev - 1 + len) % len;
        });
      }
      if (type === 'r') {
        setIndex((prev) => (prev + 1) % len);
      }
      setTime(500);
    },
    [len]
  );

  useEffect(() => {
    let style = `translateX(calc(${index + 1} * (-100% / 5)))`;
    setTrans(style);
  }, [index]);

  useEffect(() => {
    let timer1: ReturnType<typeof setTimeout>;
    if (index === images.length) {
      timer1 = setTimeout(() => {
        setTime(0);
        setIndex(0);
      }, time);
    }
    if (index === -1) {
      timer1 = setTimeout(() => {
        setTime(0);
        setIndex(3);
      }, time);
    }
    return () => clearTimeout(timer1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    if (index === -1) {
      setIndicater(images.length - 1);
    } else if (index === images.length) {
      setIndicater(0);
    } else {
      setIndicater(index);
    }
  }, [images.length, index]);

  useEffect(() => {
    setClone(cloneSlide(images));
  }, [images]);

  useEffect(() => {
    if (timer) {
      clearInterval(timer);
    }
    setTimer(
      window.setInterval(() => {
        handleArrow('r');
      }, 5000)
    );
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleArrow]);

  return (
    <div className={styles.top}>
      <div
        className={styles.container}
        onMouseEnter={() => clearInterval(timer)}
        onMouseLeave={() =>
          setTimer(
            window.setInterval(() => {
              handleArrow('r');
            }, 5000)
          )
        }
      >
        <div
          className={styles.wrapper}
          style={{
            transform: trans,
            transition: `all ${time}ms ease-in-out`,
          }}
        >
          {clone.map((item, idx) => (
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
        <ul className={styles.indicatorContainer}>
          {images.map((_, idx) => (
            <li
              className={`${styles.indicator} ${
                idx === indicater ? styles.selected : ''
              }`}
              onClick={() => setIndex(idx)}
              key={idx}
            ></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
