import { useCallback } from 'react';
import styles from '@styles/Modal.module.css';

interface Props {
  children: React.ReactNode;
  show: boolean;
  onCloseModal: (e: any) => void;
  name: string;
}

export default function Modal({ children, show, onCloseModal, name }: Props) {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  if (!show) return null;

  return (
    <div className={styles.container} onClick={onCloseModal}>
      <div className={styles.wrapper} onClick={stopPropagation}>
        <div className={styles.top}>
          <span className={styles.title}>{name}</span>
          <div>
            <span className={styles.closeBtn} onClick={onCloseModal}>
              &times;
            </span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
