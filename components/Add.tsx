import styles from '@styles/Add.module.css';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

interface Props {
  setShow: Dispatch<SetStateAction<boolean>>;
  setPizza: Dispatch<SetStateAction<products[]>>;
}

interface Extra {
  text?: string;
  price?: number;
}

export default function Add({ setShow, setPizza }: Props) {
  const [file, setFile] = useState<File>();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [prices, setPrices] = useState<number[]>([]);
  const [extra, setExtra] = useState<Extra>();
  const [extraOpts, setExtraOpts] = useState<Extra[]>([]);
  const [preImg, setPreImg] = useState<string>();

  const handleExtraInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name },
    } = e;
    const {
      target: { value },
    } = e;
    if (name === 'price') {
      setExtra({ ...extra, [name]: Number(value) });
    } else {
      setExtra({ ...extra, [name]: value });
    }
  };

  const handleExtra = () => {
    if (extra?.text && extra.price) {
      setExtraOpts((prev) => [...prev, extra]);
    } else {
      alert('값을 모두 입력하세요!');
    }
  };

  const handleCreate = async () => {
    if (!file) return;
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'uploads');
    try {
      const uploadRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
        data
      );
      const {
        data: { url },
      } = uploadRes;
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions: extraOpts,
        img: url,
      };
      await axios.post('/api/products', newProduct);
      alert('완료');
      const pizza = await axios.get('/api/products');
      setPizza(pizza.data);
      setShow(false);
    } catch (err) {
      alert('실패');
      console.log(err);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;
      if (result) {
        setPreImg(result.toString());
      }
    };

    const files = e.target.files as FileList;
    if (files) {
      reader.readAsDataURL(files[0]);
      setFile(files[0]);
    }
  };

  return (
    <>
      <h1>Add a new Pizza</h1>
      <div className={styles.imgContainer}>
        <div className={styles.preview}>
          {preImg && (
            <Image
              alt=""
              src={preImg}
              layout="fixed"
              width={100}
              height={100}
            />
          )}
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Choose an image</label>
          <input type="file" onChange={(e) => handleChange(e)} />
        </div>
      </div>
      <div className={styles.item}>
        <label className={styles.label}>Title</label>
        <input
          className={styles.input}
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={styles.item}>
        <label className={styles.label}>Desc</label>
        <textarea
          rows={4}
          onChange={(e) => setDesc(e.target.value)}
          style={{ resize: 'none' }}
        />
      </div>
      <div className={styles.item}>
        <label className={styles.label}>Prices</label>
        <div className={styles.priceContainer}>
          <input
            className={`${styles.input} ${styles.inputSm}`}
            type="number"
            placeholder="Small"
            onChange={(e) =>
              setPrices((prev) => {
                const arr = [...prev];
                arr[0] = Number(e.target.value);
                return arr;
              })
            }
          />
          <input
            className={`${styles.input} ${styles.inputSm}`}
            type="number"
            placeholder="Medium"
            onChange={(e) =>
              setPrices((prev) => {
                const arr = [...prev];
                arr[1] = Number(e.target.value);
                return arr;
              })
            }
          />
          <input
            className={`${styles.input} ${styles.inputSm}`}
            type="number"
            placeholder="Large"
            onChange={(e) =>
              setPrices((prev) => {
                const arr = [...prev];
                arr[2] = Number(e.target.value);
                return arr;
              })
            }
          />
        </div>
      </div>
      <div className={styles.item}>
        <label className={styles.label}>Extra</label>
        <div className={styles.extra}>
          <input
            className={`${styles.input} ${styles.inputSm}`}
            type="text"
            placeholder="Item"
            name="text"
            onChange={handleExtraInput}
          />
          <input
            className={`${styles.input} ${styles.inputSm}`}
            type="number"
            placeholder="Price"
            name="price"
            onChange={handleExtraInput}
          />
          <button className={styles.extraButton} onClick={handleExtra}>
            Add
          </button>
        </div>
        <div className={styles.extraItems}>
          {extraOpts.map((option) => (
            <span key={option.text} className={styles.extraItem}>
              {option.text}
            </span>
          ))}
        </div>
      </div>
      <button className={styles.addButton} onClick={handleCreate}>
        Create
      </button>
    </>
  );
}
