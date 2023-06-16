import React from 'react';
import { TailSpin } from 'react-loader-spinner';
import styles from './styles.module.css';

function Spinner() {
  return (
    <div className={styles.container}>
      <TailSpin
        height="80"
        width="80"
        color="#1488c9"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible
      />
    </div>
  );
}

export default Spinner;
