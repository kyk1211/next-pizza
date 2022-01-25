import Image from 'next/image';
import styles from '@styles/PizzaCard.module.css';
import { useState } from 'react';
import Modal from './Modal';
import Link from 'next/link';

interface Props {
  pizza: products;
}

export default function PizzaCard({ pizza }: Props) {
  const [show, setShow] = useState(false);
  const { img, title, prices, desc, _id, extraOptions } = pizza;

  return (
    <>
      <div className={styles.container} onClick={() => setShow(true)}>
        <div className={styles.imgContainer}>
          <Image src={img} alt="" layout="fill" objectFit="contain" />
        </div>
        <h1 className={styles.title}>{title}</h1>
        <span className={styles.price}>{`Small: ${prices[0]}￦`}</span>
        <span className={styles.price}>{`Medium: ${prices[1]}￦`}</span>
        <span className={styles.price}>{`Large: ${prices[2]}￦`}</span>
      </div>
      <Modal show={show} setShow={setShow}>
        <div className={styles.modalContainer}>
          <div className={styles.modalLeft}>
            <Image
              src={img}
              alt=""
              layout="fixed"
              objectFit="contain"
              width={300}
              height={300}
            />
          </div>
          <div className={styles.modalRight}>
            <h1 className={styles.title}>{title}</h1>
            <span className={styles.price}>{`Small: ${prices[0]}￦`}</span>
            <span className={styles.price}>{`Medium: ${prices[1]}￦`}</span>
            <span className={styles.price}>{`Large: ${prices[2]}￦`}</span>
            <span style={{ fontWeight: 'bold', fontSize: '20px' }}>설명</span>
            <span className={styles.desc}>{`${desc}`}</span>
            <div>
              <p style={{ fontWeight: 'bold', fontSize: '20px' }}>소스</p>
              {extraOptions.map((extra) => (
                <span key={extra._id}>{`${extra.text}, `}</span>
              ))}
            </div>
            <button className={styles.modalBtn}>
              <Link href={`/product/${_id}`}>주문하러가기</Link>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
