import styles from '../../styles/Order.module.css';
import Image from 'next/image';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { reset } from '@slice/cartSlice';
import { useEffect } from 'react';

export default function Order() {
  const dispatch = useAppDispatch();
  const status = 0;
  const statusClass = (idx: number) => {
    if (idx - status < 1) return styles.done;
    if (idx - status === 1) return styles.inProgress;
    if (idx - status > 1) return styles.undone;
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.trTitle}>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.tr}>
                <td>
                  <span className={styles.id}>123123123</span>
                </td>
                <td>
                  <span className={styles.name}>John</span>
                </td>
                <td>
                  <span className={styles.address}>Elton st. 212-33 LA</span>
                </td>
                <td>
                  <span className={styles.total}>$39.80</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.row}>
          <div className={statusClass(0)}>
            <Image alt="" src={'/img/paid.png'} width={30} height={30} />
            <span>Payment</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                alt=""
                src={'/img/checked.png'}
                width={20}
                height={20}
              />
            </div>
          </div>
          <div className={statusClass(1)}>
            <Image alt="" src="/img/bake.png" width={30} height={30} />
            <span>Preparing</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                alt=""
                src="/img/checked.png"
                width={20}
                height={20}
              />
            </div>
          </div>
          <div className={statusClass(2)}>
            <Image alt="" src={'/img/bike.png'} width={30} height={30} />
            <span>On the way</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                alt=""
                src="/img/checked.png"
                width={20}
                height={20}
              />
            </div>
          </div>
          <div className={statusClass(3)}>
            <Image alt="" src="/img/delivered.png" width={30} height={30} />
            <span>Delivered</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                alt=""
                src="/img/checked.png"
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>796000
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>0
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>796000
          </div>
          <button disabled className={styles.button}>
            PAID!
          </button>
        </div>
      </div>
    </div>
  );
}
