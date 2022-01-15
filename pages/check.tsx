import { RootState } from '@slice/store';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Check() {
  const router = useRouter();
  const { pg_token } = router.query;
  const cart = useSelector((state: RootState) => state.cart);
  const orderInfo = useSelector((state: RootState) => state.order);

  const data = {
    customer: orderInfo.name,
    orderId: cart.id,
    address: orderInfo.addr,
    phoneNumber: orderInfo.phone,
    total: cart.total,
    tid: orderInfo.tid,
  };

  useEffect(() => {
    if (pg_token) {
      axios({
        url: '/api/payment/approve',
        method: 'POST',
        data: { tid: orderInfo.tid, pg_token: pg_token, cartId: cart.id },
      })
        .then(() => {
          axios({ url: '/api/orders', method: 'POST', data: data })
            .then(() => {
              router.replace(`/orders/${cart.id}`);
            })
            .catch((err) => console.log('mongodb post error: ', err));
        })
        .catch((err) => {
          alert('결제 오류');
          console.log('approve error: ', err);
          router.replace('/cart');
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pg_token]);

  return <div>Pay Checking</div>;
}
