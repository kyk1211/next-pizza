import { NextApiRequest, NextApiResponse } from 'next/types';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    console.log(req.body);
    try {
      const cart = req.body;
      const params = {
        cid: 'TC0ONETIME',
        partner_order_id: cart._id,
        partner_user_id: cart._id,
        item_name:
          cart.products.length > 1
            ? cart.products[0].title + '...'
            : cart.products.length === 0
            ? ''
            : cart.products[0].title,
        quantity: cart.quan,
        total_amount: cart.total,
        tax_free_amount: 0,
        approval_url: `http://localhost:3000/orders/${cart._id}`,
        fail_url: `http://localhost:3000`,
        cancel_url: `http://localhost:3000/cart`,
      };

      const data = await axios({
        method: 'POST',
        url: 'https://kapi.kakao.com/v1/payment/ready',
        headers: {
          Authorization: 'KakaoAK c692001d620992e966076941fd038b3f',
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        params,
      });
      res.status(200).json(data.data);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(405).send('POST method only');
  }
}
