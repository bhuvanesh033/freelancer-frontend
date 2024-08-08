import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
  const appliedJobs = useSelector((state) => state.jobs.appliedJobs);
  const user = useSelector((state) => state.auth.user);
  const isApplied = appliedJobs.find((appliedJob) => appliedJob.id === job.id);
  const navigate = useNavigate();

  const handleBid = () => {
    navigate(`/bid/${job.id}`, { state: { job } });
  };

  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p className="description">{job.description}</p>
      <p className="budget">$ {job.budget}</p>
      <p className="deadline">Deadline: {new Date(job.deadline).toLocaleDateString()}</p>
      {user.role === 'client' ? (
        <button disabled>Clients cannot bid</button>
      ) : isApplied ? (
        <button onClick={() => navigate('/applied-jobs')}>View Application</button>
      ) : (
        <button onClick={handleBid}>Bid</button>
      )}
    </div>
  );
};

export default JobCard;
