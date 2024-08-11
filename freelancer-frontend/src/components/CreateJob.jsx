import React, { useState } from 'react';
import axios from 'axios';
import styles from './CreateJob.module.css'; // Import CSS Module

const CreateJob = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Verify the token is correct
  
    if (!token) {
      console.error('No token found, authorization denied');
      return;
    }
  
    const jobData = {
      title,
      description,
      budget,
      deadline,
    };
  
    try {
      const response = await axios.post(
        'https://free-lancer-1.onrender.com/api/jobs/',
        jobData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure token is properly included
          },
        }
      );
  
      console.log('Job created successfully', response.data);
      // Handle successful job creation, e.g., navigate to another page or show a success message
    } catch (error) {
      console.error('Error creating job:', error.response?.data?.msg || error.message);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Job</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Budget:</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Deadline:</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>Create Job</button>
      </form>
    </div>
  );
};

export default CreateJob;
