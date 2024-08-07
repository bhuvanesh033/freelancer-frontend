import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const appliedJobsCount = useSelector((state) => state.jobs.appliedJobs.length);

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/applied-jobs">Applied Jobs ({appliedJobsCount})</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
