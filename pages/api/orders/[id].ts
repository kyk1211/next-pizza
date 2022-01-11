import dbConnect from '@utils/mongo';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  console.log(query);
  await dbConnect();

  if (method === 'GET') {
  }
  if (method === 'PUT') {
  }
  if (method === 'DELETE') {
  }
}

export default handler;
