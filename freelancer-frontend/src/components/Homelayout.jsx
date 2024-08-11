import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import styles from './Homelayout.module.css';

const Homelayout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default Homelayout;
