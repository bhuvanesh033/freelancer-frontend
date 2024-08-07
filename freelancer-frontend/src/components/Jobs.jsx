import React from 'react';
import { useSelector } from 'react-redux';
import JobCard from './JobsCard';

const Job = () => {
  const jobs = useSelector((state) => state.jobs.jobs);

  return (
    <div className="job-container">
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))
      ) : (
        <p>No jobs available</p>
      )}
    </div>
  );
};

export default Job;
