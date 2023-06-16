import React from 'react';
import styles from './styles.module.css';

function Button(props) {
  const { text, onClick } = props;
  return (
    <button className={styles.button} type="button" onClick={onClick}>{text}</button>
  );
}

export default Button;
