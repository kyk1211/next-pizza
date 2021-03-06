import { NextApiRequest, NextApiResponse } from 'next/types';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const cart = req.body;

      const params = {
        cid: 'TC0ONETIME',
        partner_order_id: cart.id,
        partner_user_id: cart.id,
        item_name:
          cart.products.length > 1
            ? cart.products[0].title + '...'
            : cart.products[0].title,
        quantity: cart.quan,
        total_amount: cart.total,
        tax_free_amount: 0,
        approval_url: `${process.env.DOMAIN}/check`,
        fail_url: `${process.env.DOMAIN}`,
        cancel_url: `${process.env.DOMAIN}/cart`,
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
