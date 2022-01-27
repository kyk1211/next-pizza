import SearchInput from '@components/SearchInput';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '@styles/SearchOrder.module.css';

export default function SearchOrder() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleClick = async () => {
    try {
      const order = await axios.get(`/api/orders?name=${name}&phone=${phone}`);
      const data = order.data;
      if (data) {
        router.push(`/orders/${data.orderId}`);
      } else {
        alert('주문정보가 없습니다');
      }
    } catch (err) {
      console.log(err);
      alert('주문정보가 없습니다');
    }
    setName('');
    setPhone('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <label className={styles.label}>
          <p>고객이름</p>
          <SearchInput value={name} setValue={setName} placeholder={'이름'} />
        </label>
        <label className={styles.label}>
          <p>전화번호</p>
          <SearchInput
            value={phone}
            setValue={setPhone}
            placeholder={'전화번호'}
          />
        </label>
        <button onClick={handleClick} className={styles.button}>
          주문조회
        </button>
      </div>
    </div>
  );
}
