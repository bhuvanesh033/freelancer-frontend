import React from 'react';
import { JOBS } from "../constant";
import JobCard from './JobsCard';

const Job = () => {
    return (
        <div className="job-container">
            {JOBS.map((job) => {
                return <JobCard key={job.id} job={job} />;
            })}
        </div>
    );
};

export default Job;
