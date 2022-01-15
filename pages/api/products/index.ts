import dbConnect from '@utils/mongo';
import type { NextApiRequest, NextApiResponse } from 'next';
import Product from '@models/Product';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, cookies } = req;
  const token = cookies.token;

  await dbConnect();

  if (method === 'GET') {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === 'POST') {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json('admin이 아닙니다');
    }

    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
