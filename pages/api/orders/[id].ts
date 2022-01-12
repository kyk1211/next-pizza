import Order from '@models/Order';
import dbConnect from '@utils/mongo';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { id } = query;

  await dbConnect();

  if (method === 'PUT') {
    try {
      const order = await Order.findOneAndUpdate({ orderId: id }, req.body, {
        new: true,
      });
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === 'DELETE') {
    try {
      await Order.findOneAndDelete({ orderId: id });
      res.status(200).json('The product has been deleted!');
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === 'GET') {
    try {
      const order = await Order.findOne({ orderId: id });
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

export default handler;
