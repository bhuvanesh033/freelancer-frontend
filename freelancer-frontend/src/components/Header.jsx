import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import styles from './Header.module.css';

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          {user && user.userType === 'freelancer' && (
            <>
              <li><Link className={styles.navLink} to="/">Home</Link></li>
              <li><Link className={styles.navLink} to="/applied-jobs">Applied Jobs</Link></li>
              <li><Link className={styles.navLink} to="/messages">Messages</Link></li>
            </>
          )}
          {user && user.userType === 'client' && (
            <>
              <li><Link className={styles.navLink} to="/create-job">Create Job</Link></li>
              <li><Link className={styles.navLink} to="/my-jobs">My Jobs</Link></li>
              <li><Link className={styles.navLink} to="/accepted-bids">Ongoing Jobs</Link></li>
            </>
          )}
          {user ? (
            <>
              <li><span className={styles.userEmail}>{user.email}</span></li>
              <li><button className={styles.logoutButton} onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link className={styles.navLink} to="/login">Login</Link></li>
              <li><Link className={styles.navLink} to="/signup">Signup</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
