interface products {
  _id?: string;
  title: string;
  desc: string;
  img: string;
  prices: number[];
  extraOptions: Opts[];
  createdAt: Date;
  updatedAT: Date;
}

interface Opts {
  text: string;
  price: number;
  _id?: string;
}
