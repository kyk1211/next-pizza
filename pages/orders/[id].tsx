import styles from '../../styles/Order.module.css';
import Image from 'next/image';
import { useEffect } from 'react';
import { reset } from '@slice/cartSlice';
import { useRouter } from 'next/router';

export default function Order() {
  const router = useRouter();
  let status = 0;

  const statusClass = (idx: number) => {
    if (idx - status < 1) return styles.done;
    if (idx - status === 1) return styles.inProgress;
    if (idx - status > 1) return styles.undone;
  };

  useEffect(() => {
    dispatch(reset());
  }, []);

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
                  <span className={styles.id}>cart.id</span>
                </td>
                <td>
                  <span className={styles.name}>orderInfo.name</span>
                </td>
                <td>
                  <span className={styles.address}>orderInfo.addr</span>
                </td>
                <td>
                  <span className={styles.total}>cart.total</span>
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
                layout="fixed"
              />
            </div>
          </div>
          <div className={statusClass(1)}>
            <Image
              alt=""
              src="/img/bake.png"
              width={30}
              height={30}
              layout="fixed"
            />
            <span>Preparing</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                alt=""
                src="/img/checked.png"
                width={20}
                height={20}
                layout="fixed"
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
                layout="fixed"
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
                layout="fixed"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>
            cart.total
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>0
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>
            cart.total
          </div>
          <button disabled className={styles.button}>
            PAID!
          </button>
        </div>
      </div>
    </div>
  );
}
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
