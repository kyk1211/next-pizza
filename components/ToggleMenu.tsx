import { useEffect, useState } from 'react';
import styles from '@styles/ToggleMenu.module.css';

interface Props {
  quan: number;
  toggle: boolean;
  children: React.ReactNode;
}

export default function ToggleMenu({ quan, toggle, children }: Props) {
  const [show, setShow] = useState(toggle);
  const [ani, setAni] = useState<'in' | 'out' | 'none' | null>('none');

  useEffect(() => {
    if (ani === 'none' && !toggle) {
      setShow(false);
    } else if (ani === 'none' && toggle) {
      setAni('in');
      setShow(true);
    } else if (ani === null && !toggle) {
      setAni('out');
      setShow(true);
    }
  }, [ani, toggle]);

  const aniEnd = () => {
    setAni((prev) => (prev === 'out' ? 'none' : null));
  };

  if (!show) return null;

  return (
    <div
      className={`${styles.smallMenu} ${
        ani === null ? '' : ani === 'in' ? styles.in : styles.out
      }`}
      onAnimationEnd={aniEnd}
    >
      {children}
    </div>
  );
}
