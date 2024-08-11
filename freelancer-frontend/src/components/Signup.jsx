import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Signup.module.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('freelancer');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://free-lancer-1.onrender.com/api/auth/signup', {
        name,
        email,
        password,
        userType,
      });
      console.log('Signup successful', response.data);
      navigate('/login'); // Redirect to login page after successful signup
    } catch (err) {
      console.error('Signup failed', err.response?.data?.msg || err.message);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <h2 className={styles.signupTitle}>Signup</h2>
      <form onSubmit={handleSubmit} className={styles.signupForm}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>User Type:</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className={styles.select}
          >
            <option value="freelancer">Freelancer</option>
            <option value="client">Client</option>
          </select>
        </div>
        <button type="submit" className={styles.signupButton}>Signup</button>
      </form>
      <p className={styles.loginPrompt}>
        Already have an account? <Link to="/login" className={styles.loginLink}>Login here</Link>.
      </p>
    </div>
  );
};

export default Signup;
