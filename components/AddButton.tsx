import styles from '@styles/Add.module.css';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  setClose: Dispatch<SetStateAction<boolean>>;
}

export default function AddButton({ setClose }: Props) {
  return (
    <div className={styles.mainAddButton} onClick={() => setClose(false)}>
      Add New
    </div>
  );
}
