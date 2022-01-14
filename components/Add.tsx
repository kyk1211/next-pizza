import styles from '@styles/Add.module.css';
import { Dispatch, SetStateAction, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Props {
  setClose: Dispatch<SetStateAction<boolean>>;
}

interface Extra {
  text?: string;
  price?: number[];
}

export default function Add({ setClose }: Props) {
  const [file, setFile] = useState<File>();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [prices, setPrices] = useState<number[]>([]);
  const [extra, setExtra] = useState<Extra>();
  const [extraOpts, setExtraOpts] = useState<Extra[]>([]);

  const changePrice = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const currentPrices = prices;
    currentPrices[idx] = Number(e.target.value);
    setPrices(currentPrices);
  };

  const handleExtraInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = () => {
    if (extra?.text && extra.price) {
      setExtraOpts((prev) => [...prev, extra]);
    } else {
      alert('값을 모두 입력하세요!');
    }
  };

  const handleCreate = async () => {};
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose(true)} className={styles.close}>
          X
        </span>
        <h1>Add a new Pizza</h1>
        <div className={styles.item}>
          <label className={styles.label}>Choose an image</label>
          <input
            type="file"
            onChange={(e) => {
              const files = e.target.files as FileList;
              setFile(files[0]);
            }}
          />
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
          <textarea rows={4} onChange={(e) => setDesc(e.target.value)} />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Prices</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Small"
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Medium"
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Large"
              onChange={(e) => changePrice(e, 2)}
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
      </div>
    </div>
  );
}
