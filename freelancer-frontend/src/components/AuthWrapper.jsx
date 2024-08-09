import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthWrapper = ({ children, role }) => {
  const user = useSelector((state) => state.auth.user);

  console.log('User state:', user);
  console.log('Required role:', role);

  if (!user) {
    console.log('No user found, redirecting to login.');
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    console.log('User role does not match, redirecting to home.');
    return <Navigate to="/" />;
  }

  console.log('User is authenticated and authorized, rendering children.');
  return children;
};

export default AuthWrapper;
