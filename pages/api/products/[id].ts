import dbConnect from '@utils/mongo';
import type { NextApiRequest, NextApiResponse } from 'next';
import Product from '@models/Product';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { id },
  } = req;

  dbConnect();

  switch (method) {
    case 'PUT':
      try {
        const product = await Product.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        res.status(200).json(product);
      } catch (err) {
        res.status(500).json(err);
      }
      break;
    case 'DELETE':
      try {
        await Product.findByIdAndDelete(id);
        res.status(200).json('The product has been deleted!');
      } catch (err) {
        res.status(500).json(err);
      }
      break;
    default:
      try {
        const product = await Product.findById(id);
        res.status(200).json(product);
      } catch (err) {
        res.status(500).json(err);
      }
  }
}
