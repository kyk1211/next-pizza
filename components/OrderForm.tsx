import { useAppDispatch } from '@hooks/useAppDispatch';
import { updateInfo } from '@slice/orderSlice';
import { RootState } from '@slice/store';
import styles from '@styles/OrderForm.module.css';
import { Dispatch, SetStateAction, useState } from 'react';
import { useSelector } from 'react-redux';

interface Props {
  tid: string;
  setShow: Dispatch<SetStateAction<boolean>>;
  setBtn: Dispatch<SetStateAction<boolean>>;
}

export default function OrderForm({ tid, setShow, setBtn }: Props) {
  const orderInfo = useSelector((state: RootState) => state.order);
  const dispatch = useAppDispatch();
  const [name, setName] = useState(orderInfo.name || '');
  const [addr, setAddr] = useState(orderInfo.addr || '');
  const [phone, setPhone] = useState(orderInfo.phone || '');

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

  return (
    <>
      <h1>배달정보입력</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.item}>
          <label className={styles.label}>이름</label>
          <input
            className={styles.input}
            required
            type="text"
            placeholder="이름"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>주소</label>
          <input
            className={styles.input}
            type="text"
            required
            placeholder="주소"
            onChange={(e) => setAddr(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>전화번호</label>
          <input
            className={styles.input}
            type="text"
            required
            placeholder="전화번호"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <button type="submit" className={styles.submitBtn}>
            제출
          </button>
        </div>
      </form>
    </>
  );
}
