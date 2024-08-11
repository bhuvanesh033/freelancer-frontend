import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import styles from './Jobs.module.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleBidClick = (jobId) => {
    navigate(`/jobs/${jobId}/bid`);
  };

  return (
    <div className={styles.jobsContainer}>
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div key={job._id} className={styles.jobCard}>
            <h2 className={styles.jobTitle}>{job.title}</h2>
            <p className={styles.jobDescription}>{job.description}</p>
            <p className={styles.jobBudget}>Budget: ${job.budget}</p>
            <button className={styles.bidButton} onClick={() => handleBidClick(job._id)}>
              Bid on this job
            </button>
          </div>
        ))
      ) : (
        <p>No jobs available at the moment.</p>
      )}
    </div>
  );
};

export default Jobs;
