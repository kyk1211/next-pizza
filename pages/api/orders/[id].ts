import Order from '@models/Order';
import dbConnect from '@utils/mongo';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, cookies } = req;
  const { id } = query;

  const token = cookies.token;

  await dbConnect();

  if (method === 'PUT') {
    try {
      await Order.updateOne({ orderId: id }, req.body);
      res.status(200).json('Update Success');
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === 'DELETE') {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json('admin이 아닙니다');
    }
    try {
      await Order.deleteOne({ orderId: id });
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
