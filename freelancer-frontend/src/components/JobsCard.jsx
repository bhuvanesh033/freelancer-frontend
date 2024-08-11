import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './JobCard.module.css'; // Import CSS Module

const JobCard = ({ job }) => {
  const appliedJobs = useSelector((state) => state.jobs.appliedJobs);
  const user = useSelector((state) => state.auth.user);
  const isApplied = appliedJobs.find((appliedJob) => appliedJob.id === job.id);
  const navigate = useNavigate();

  const handleBid = () => {
    navigate(`/bid/${job.id}`, { state: { job } });
  };

  return (
    <div className={styles.jobCard}>
      <h3 className={styles.jobTitle}>{job.title}</h3>
      <p className={styles.description}>{job.description}</p>
      <p className={styles.budget}>$ {job.budget}</p>
      <p className={styles.deadline}>Deadline: {new Date(job.deadline).toLocaleDateString()}</p>
      {user.role === 'client' ? (
        <button className={styles.disabledButton} disabled>Clients cannot bid</button>
      ) : isApplied ? (
        <button className={styles.viewButton} onClick={() => navigate('/applied-jobs')}>View Application</button>
      ) : (
        <button className={styles.bidButton} onClick={handleBid}>Bid</button>
      )}
    </div>
  );
};

export default JobCard;
