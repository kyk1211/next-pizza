import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    if (
      username === process.env.NEXT_PUBLIC_ADMIN_USER_ID &&
      password === process.env.NEXT_PUBLIC_ADMIN_USER_PASSWORD
    ) {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', process.env.NEXT_PUBLIC_TOKEN as string, {
          maxAge: 60 * 60,
          sameSite: 'strict',
          path: '/',
        })
      );
      res.status(200).json('Success');
    } else {
      res.status(400).json('Wrong Credentials');
    }
  }
}
