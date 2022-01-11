import dbConnect from '@utils/mongo';
import type { NextApiRequest, NextApiResponse } from 'next';
import Order from '@models/Order';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await dbConnect();

  const data = req.body;

  const info = {
    customer: data.name,
    address: data.addr,
    total: data.total,
  };

  if (method === 'POST') {
    try {
      const order = await Order.create(info);
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === 'GET') {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export default handler;
