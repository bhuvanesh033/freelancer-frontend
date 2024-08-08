import React from 'react';
import { useSelector } from 'react-redux';
import JobCard from './JobsCard';

const Job = () => {
  const jobs = useSelector((state) => state.jobs.jobs);
  const user = useSelector((state) => state.auth.user);

  const filteredJobs = user.role === 'client' ? jobs.filter(job => job.clientId === user.id) : jobs;

  return (
    <div className="job-container">
      {filteredJobs.length > 0 ? (
        filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))
      ) : (
        <p>No jobs available</p>
      )}
    </div>
  );
};

export default Job;
