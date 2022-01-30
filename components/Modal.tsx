import { Dispatch, SetStateAction, useCallback } from 'react';
import styles from '@styles/Modal.module.css';

interface Props {
  children: React.ReactNode;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export default function Modal({ children, show, setShow }: Props) {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const onCloseModal = () => {
    if (window.confirm('창을 닫으시겠습니까?')) {
      setShow(false);
    }
  };

  if (!show) return null;

  return (
    <div className={styles.container} onClick={onCloseModal}>
      <div className={styles.wrapper} onClick={stopPropagation}>
        <span onClick={onCloseModal} className={styles.close}>
          X
        </span>
        {children}
      </div>
    </div>
  );
}
