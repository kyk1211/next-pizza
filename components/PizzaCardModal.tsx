import styles from '@styles/PizzaCardModal.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import Modal from './Modal';

interface Props {
  pizza: products;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export default function PizzaCardModal({ pizza, show, setShow }: Props) {
  const { img, title, prices, desc, _id, extraOptions } = pizza;

  return (
    <Modal show={show} setShow={setShow}>
      <div className={styles.modalContainer}>
        <div className={styles.modalLeft}>
          <Image src={img} alt="" layout="fixed" objectFit="contain" width={250} height={250} />
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
  );
}
