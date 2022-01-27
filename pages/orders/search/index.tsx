import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

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
    <div>
      <label>
        고객이름:
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        전화번호:
        <input type="text" onChange={(e) => setPhone(e.target.value)} />
      </label>
      <button onClick={handleClick}>search</button>
    </div>
  );
}
