import Image from 'next/image';
import styles from '@styles/Cart.module.css';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { RootState } from '@slice/store';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { removeProduct, reset, setId } from '@slice/cartSlice';
import Modal from '@components/Modal';
import { updateInfo } from '@slice/orderSlice';

export default function Cart() {
  const cart = useSelector((state: RootState) => state.cart);
  const orderInfo = useSelector((state: RootState) => state.order);
  const dispatch = useAppDispatch();
  const [payUrl, setPayUrl] = useState('');
  const [show, setShow] = useState(false);
  const [btn, setBtn] = useState(false);
  const [tid, setTid] = useState('');
  const [name, setName] = useState(orderInfo.name || '');
  const [addr, setAddr] = useState(orderInfo.addr || '');
  const [phone, setPhone] = useState(orderInfo.phone || '');

  const payStartClick = () => {
    if (cart.products.length !== 0) {
      axios({
        method: 'POST',
        url: '/api/payment/ready',
        data: {
          ...cart,
        },
      }).then((res) => {
        setPayUrl(res.data.next_redirect_pc_url);
        setTid(res.data.tid);
        setShow(true);
      });
    } else {
      alert('장바구니가 비었습니다');
    }
  };

  const onCloseModal = () => {
    setShow(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateInfo({
        name,
        addr,
        phone,
        tid,
      })
    );
    setBtn(true);
    setShow(false);
  };

  useEffect(() => {
    dispatch(setId());
    dispatch(updateInfo({ name: '', addr: '', tid: '', phone: '' }));
  }, [dispatch]);

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
                      {`${extra.text}, `}
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
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <button className={styles.button} onClick={payStartClick}>
              결제 정보 입력하기
            </button>
            {btn && (
              <div className={styles.linkContainer}>
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
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal show={show} onCloseModal={onCloseModal} name="주문 정보 입력">
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.labelContainer}>
            <label className={styles.label} htmlFor="name">
              이름
            </label>
            <input
              className={styles.input}
              required
              type="text"
              value={name}
              name="name"
              placeholder="이름"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.labelContainer}>
            <label className={styles.label} htmlFor="address">
              주소
            </label>
            <input
              className={styles.input}
              type="text"
              required
              value={addr}
              name="address"
              placeholder="주소"
              onChange={(e) => setAddr(e.target.value)}
            />
          </div>
          <div className={styles.labelContainer}>
            <label className={styles.label} htmlFor="phone">
              전화번호
            </label>
            <input
              className={styles.input}
              type="text"
              name="phone"
              required
              value={phone}
              placeholder="전화번호"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className={styles.buttonBox}>
            <button type="submit" className={styles.formButton}>
              제출
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
