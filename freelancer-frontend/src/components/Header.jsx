import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header>
      <nav>
        <ul>
          {/* <li><Link to="/">Home</Link></li> */}
          {user && user.userType === 'freelancer' && (<>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/applied-jobs">Applied Jobs</Link></li>
            <li><Link to="/messages">Messages</Link></li>
            </>
          )}
          {user && user.userType === 'client' && (<>
              <li><Link to="/create-job">Create Job</Link></li>
              {/* <li><Link to="/my-bids">View Bids</Link></li> */}
              <li><Link to="/my-jobs">My Jobs</Link></li>
              <li><Link to="/accepted-bids">Ongoing Jobs</Link></li>
            </>
          )}
          {user ? (
            <>
              <li><span>{user.email}</span></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
