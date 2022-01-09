import { NextApiRequest, NextApiResponse } from 'next/types';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const params = req.query;
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
