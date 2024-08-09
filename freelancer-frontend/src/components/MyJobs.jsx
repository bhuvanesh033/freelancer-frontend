import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);

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

  return (
    <div>
      <h2>My Posted Jobs</h2>
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div key={job._id}>
            <h3>{job.title}</h3>
            <p>Description: {job.description}</p>
            <p>Budget: {job.budget}</p>
            <p>Deadline: {job.deadline}</p>
          </div>
        ))
      ) : (
        <p>No jobs found</p>
      )}
    </div>
  );
};

export default MyJobs;
