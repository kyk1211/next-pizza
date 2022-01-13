import styles from '@styles/Product.module.css';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { addProduct } from '@slice/cartSlice';

interface Props {
  pizza: products;
}

export default function Product({ pizza }: Props) {
  const { img, title, prices, extraOptions, desc, _id } = pizza;
  const [size, setSize] = useState<1 | 2 | 0>(0);
  const [extraPrice, setExtraPrice] = useState(0);
  const [quan, setQuan] = useState(1);
  const [price, setPrice] = useState(prices[size] + extraPrice);
  const [extras, setExtras] = useState<Opts[]>([]);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>, opts: Opts) => {
    const checked = e.target.checked;

    if (checked) {
      setExtraPrice((prev) => prev + Number(e.target.value));
      setExtras((prev) => [...prev, opts]);
    } else {
      setExtraPrice((prev) => prev - Number(e.target.value));
      setExtras((prev) => prev.filter((item) => item._id !== opts._id));
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...pizza, extras, price, quan }));
    alert('장바구니에 추가하였습니다.');
  };

  useEffect(() => {
    setPrice(prices[size] + extraPrice);
  }, [size, extraPrice, prices]);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={img} layout="fill" objectFit="contain" alt="" priority />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{title}</h1>
        <span className={styles.price}>{price}￦</span>
        <p className={styles.desc}>{desc}</p>
        <h3 className={styles.choose}>Choose your size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => setSize(0)}>
            <Image src="/img/size.png" alt="" layout="fill" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => setSize(1)}>
            <Image src="/img/size.png" alt="" layout="fill" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => setSize(2)}>
            <Image src="/img/size.png" alt="" layout="fill" />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {extraOptions.map((opt) => (
            <div className={styles.option} key={opt._id}>
              <input
                type="checkbox"
                id={opt.text}
                name={opt.text}
                className={styles.checkbox}
                value={opt.price}
                onChange={(e) => handleChange(e, opt)}
              />
              <label htmlFor={opt.text}>{opt.text}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input
            type="number"
            min={1}
            defaultValue={1}
            className={styles.quantity}
            onChange={(e) => setQuan(Number(e.target.value))}
          />
          <button className={styles.button} onClick={handleClick}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `http://localhost:3000/api/products/${params?.id}`
  );

  return {
    props: {
      pizza: res.data,
    },
  };
};
