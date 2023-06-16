'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';
import auth from '@/utils/auth';
import Button from '@/components/Button/Button';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (auth.isAuthenticated) {
      router.push('/my-actions');
    }
  });

  const handleSubmit = () => {
    setError();

    fetch('http://127.0.0.1:8080/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Credenciales invalidas');
      })
      .then((json) => {
        auth.signin(json.token);
        router.push('/my-actions');
      })
      .catch((err) => setError(err));
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.loginBox}>
        <p className={styles.title}>Bienvenido!</p>
        <label className={styles.label} htmlFor="usuario">
          Usuario
          <br />
          <input
            type="text"
            id="usuario"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className={styles.label} htmlFor="contrasena">
          Contraseña
          <br />
          <input
            type="password"
            id="contrasena"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && <p className={styles.error}>Usuario o clave invalida.</p>}
        <Button text="Iniciar sesión" onClick={() => handleSubmit()} />
      </form>
    </div>
  );
}

export default Login;
