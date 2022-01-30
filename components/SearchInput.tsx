import React, { Dispatch, SetStateAction } from 'react';
import styles from '@styles/SearchInput.module.css';

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder?: string;
}

export default function SearchInput({ value, setValue, placeholder }: Props) {
  return (
    <input
      className={styles.searchbar}
      type="search"
      value={value}
      placeholder={placeholder ? placeholder : '검색'}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
