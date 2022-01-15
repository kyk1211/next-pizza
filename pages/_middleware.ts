import { NextResponse } from 'next/server';
import { NextApiRequest } from 'next/types';

export async function middleware(req: NextApiRequest) {
  const myCookie = req.cookies;
  const token = myCookie.token;

  const url = req.url as string;

  if (token === process.env.TOKEN && url === '/admin/login') {
    return NextResponse.redirect('/admin');
  }
}
