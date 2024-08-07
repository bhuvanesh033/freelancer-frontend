import React from 'react';
import { useSelector } from 'react-redux';

const AppliedJobs = () => {
  const appliedJobs = useSelector((state) => state.jobs.appliedJobs);

  return (
    <div className="applied-jobs-container">
      <h2>Applied Jobs</h2>
      {appliedJobs.length === 0 ? (
        <p>No jobs applied yet.</p>
      ) : (
        appliedJobs.map((job) => (
          <div key={job.id} className="job-card">
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p>Budget: $ {job.budget}</p>
            <p>Deadline: {new Date(job.deadline).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default AppliedJobs;
