import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

function Header({ page, user }) {
  return (
    <div className={styles.container}>
      <p>{page}</p>
      <p>
        soy el usuario
        {' '}
        {user}
      </p>
    </div>
  );
}

Header.propTypes = {
  user: PropTypes.string,
};

export default Header;
