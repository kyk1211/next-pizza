interface products {
  _id: string;
  title: string;
  desc: string;
  img: string;
  prices: number[];
  extraOptions: Opts[];
  createdAt: Date;
  updatedAt: Date;
  _v?: number;
}

interface Opts {
  text: string;
  price: number;
  _id: string;
}

interface orders {
  _id: string;
  orderId: string;
  customer: string;
  address: string;
  phoneNumber: string;
  total: number;
  tid: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  _v?: number;
}
