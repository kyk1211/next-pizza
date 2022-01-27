import dbConnect from '@utils/mongo';
import type { NextApiRequest, NextApiResponse } from 'next';
import Order from '@models/Order';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  const { name, phone } = query;

  await dbConnect();

  if (method === 'POST') {
    try {
      const order = await Order.create(req.body);
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === 'GET') {
    if (name && phone) {
      try {
        const order = await Order.findOne({
          customer: name,
          phoneNumber: phone,
        });

        res.status(200).json(order);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      try {
        const orders = await Order.find();
        res.status(200).json(orders);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }
}
