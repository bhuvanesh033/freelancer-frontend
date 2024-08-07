import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Homelayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Homelayout;
