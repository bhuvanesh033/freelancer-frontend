import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

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
    <div>
      {jobs.map((job) => (
        <div key={job._id}>
          <h2>{job.title}</h2>
          <p>{job.description}</p>
          <p>Budget: {job.budget}</p>
          <button onClick={() => handleBidClick(job._id)}>Bid on this job</button>
        </div>
      ))}
    </div>
  );
};

export default Jobs;
