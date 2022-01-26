import React, { Dispatch, SetStateAction } from 'react';
import styles from '@styles/SearchInput.module.css';

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export default function SearchInput({ value, setValue }: Props) {
  return (
    <input
      className={styles.searchbar}
      type="text"
      value={value}
      placeholder="검색"
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
