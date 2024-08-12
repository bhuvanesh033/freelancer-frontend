import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { login } from '../redux/authSlice';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('freelancer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
  
      const { token, user } = response.data; // Ensure `user` object includes `id`
      console.log('Token:', token);
      console.log('User:', user); // Add this for debugging
      localStorage.setItem('token', token);
  
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
      dispatch(login(user)); // Store user including id in Redux
  
      navigate('/'); 
    } catch (err) {
      console.error('Login failed', err.response?.data?.msg || err.message);
      setError(err.response?.data?.msg || 'Login failed');
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>User Type:</label>
          <select value={userType} onChange={(e) => setUserType(e.target.value)}>
            <option value="freelancer">Freelancer</option>
            <option value="client">Client</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign up here</Link>.</p>
    </div>
  );
};

export default Login;
