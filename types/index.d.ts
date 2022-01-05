export interface products {
  _id?: number;
  title: string;
  desc: string;
  img: string;
  prices: number[];
  extraOptions: { text: string; price: number; _id?: number }[];
  createdAt: Date;
  updatedAT: Date;
}
