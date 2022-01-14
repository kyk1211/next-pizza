import styles from '@styles/Add.module.css';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  setShow: Dispatch<SetStateAction<boolean>>;
}

export default function AddButton({ setShow }: Props) {
  return (
    <div className={styles.mainAddButton} onClick={() => setShow(true)}>
      Add New
    </div>
  );
}
