import styles from '@styles/Login.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    try {
      const res = await axios.post('/api/login', {
        username,
        password,
      });
      router.replace('/admin');
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Admin Dashboard</h1>
        <input
          placeholder="username"
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.button} onClick={handleClick}>
          Sign In
        </button>
        {error && <span className={styles.error}>Wrong</span>}
      </div>
    </div>
  );
}
