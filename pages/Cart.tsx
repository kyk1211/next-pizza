import Image from 'next/image';
import styles from '@styles/Cart.module.css';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { RootState } from '@slice/store';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Cart() {
  const dispatch = useAppDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    axios({
      method: 'POST',
      url: '/api/payment',
      headers: {
        Authorization: 'KakaoAK c692001d620992e966076941fd038b3f',
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      params: {
        cid: 'TC0ONETIME',
        partner_order_id: 'pizzapizza',
        partner_user_id: 'asdfasdf',
        item_name: 'pizza',
        quantity: 1,
        total_amount: 12000,
        tax_free_amount: 0,
        approval_url: `http://localhost:3000/order/${cart.products[0]._id}`,
        fail_url: `http://localhost:3000`,
        cancel_url: `http://localhost:3000/product/${cart.products[0]._id}`,
      },
    }).then((res) => {
      console.log(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <button className={styles.button}>CHECKOUT NOW!</button>
        </div>
        <Link href={''} passHref>
          <button>
            <a>결제 이동</a>
          </button>
        </Link>
      </div>
    </div>
  );
}
