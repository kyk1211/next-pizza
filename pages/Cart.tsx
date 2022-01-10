import Image from 'next/image';
import styles from '@styles/Cart.module.css';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { RootState } from '@slice/store';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { removeProduct } from '@slice/cartSlice';
import { useRouter } from 'next/router';

export default function Cart() {
  const dispatch = useAppDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const [payUrl, setPayUrl] = useState('');
  const [toggle, setToggle] = useState(false);
  const [tid, setTid] = useState('');

  const payStartClick = () => {
    axios({
      method: 'POST',
      url: '/api/payment/ready',
      data: {
        ...cart,
      },
    }).then((res) => {
      setPayUrl(res.data.next_redirect_pc_url);
      setTid(res.data.tid);
      setToggle(true);
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {cart.products.map((product, idx) => (
              <tr className={styles.tr} key={idx}>
                <td style={{ display: 'flex', justifyContent: 'center' }}>
                  <div className={styles.imgContainer}>
                    <Image
                      src={product.img}
                      layout="fill"
                      objectFit="contain"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td>
                  {product.extras.map((extra, idx) => (
                    <span className={styles.extras} key={idx}>
                      {extra.text}
                    </span>
                  ))}
                </td>
                <td>
                  <span className={styles.price}>{`${product.price} ￦`}</span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quan}</span>
                </td>
                <td>
                  <span className={styles.total}>{`${
                    product.price * product.quan
                  } ￦`}</span>
                </td>
                <td>
                  <button
                    onClick={() => dispatch(removeProduct({ ...product }))}
                  >
                    &times;
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>
            {`${cart.total} ￦`}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>
            {`0 ￦`}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>
            {`${cart.total} ￦`}
          </div>
          {toggle ? (
            <Link href={payUrl} passHref>
              <a>
                <div className={styles.button}>
                  <Image
                    src="/img/payment_icon_yellow_large.png"
                    alt=""
                    layout="fill"
                  />
                </div>
              </a>
            </Link>
          ) : cart.total !== 0 ? (
            <button className={styles.button} onClick={payStartClick}>
              결제하기
            </button>
          ) : (
            <button className={styles.button} disabled>
              결제하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
