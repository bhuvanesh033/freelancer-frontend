import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './MyJobs.module.css'; // Import the CSS module

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('https://free-lancer-1.onrender.com/api/jobs', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        setJobs(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch jobs');
      }
    };

    fetchJobs();
  }, []);

  const handleViewBids = (jobId) => {
    navigate(`/bids/${jobId}`);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>My Posted Jobs</h2>
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div key={job._id} className={styles.jobCard}>
            <h3 className={styles.jobTitle}>{job.title}</h3>
            <p className={styles.jobDetail}>Description: {job.description}</p>
            <p className={styles.jobDetail}>Budget: ${job.budget}</p>
            <p className={styles.jobDetail}>Deadline: {new Date(job.deadline).toLocaleDateString()}</p>
            <button className={styles.button} onClick={() => handleViewBids(job._id)}>View Bids</button>
          </div>
        ))
      ) : (
        <p>No jobs found</p>
      )}
    </div>
  );
};

export default MyJobs;
