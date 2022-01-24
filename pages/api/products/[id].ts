import dbConnect from '@utils/mongo';
import type { NextApiRequest, NextApiResponse } from 'next';
import Product from '@models/Product';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query, cookies } = req;
  const { id } = query;
  const token = cookies.token;
  console.log(id);

  await dbConnect();

  if (method === 'PUT') {
    if (!token || token !== process.env.TOKEN) {
      res.status(401).json('admin이 아닙니다');
    }
    try {
      const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === 'DELETE') {
    if (!token || token !== process.env.TOKEN) {
      res.status(401).json('admin이 아닙니다');
    }
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json('The product has been deleted!');
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === 'GET') {
    try {
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
