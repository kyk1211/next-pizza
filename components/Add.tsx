import styles from '@styles/Add.module.css';
import { Dispatch, SetStateAction, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Props {
  setClose: Dispatch<SetStateAction<boolean>>;
}

export default function Add({ setClose }: Props) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [prices, setPrices] = useState<number[]>([]);
  const [extras, setExtras] = useState();
  const [extraOpts, setExtraOpts] = useState<
    { text: string; price: number; _id: string }[]
  >([]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose(true)} className={styles.close}></span>
        <h1>Add new one</h1>
        <div className={styles.item}>
          <label className={styles.label}>Choose an Image</label>
          <input type="file" />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Choose an Image</label>
          <input type="text" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Choose an Image</label>
          <input type="text" />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Choose an Image</label>
          <input type="text" />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Choose an Image</label>
          <input type="text" />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Choose an Image</label>
          <input type="file" />
        </div>
      </div>
    </div>
  );
}
