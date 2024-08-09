import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const AppliedJobs = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Retrieve token from local storage or any other auth mechanism
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await axios.get('https://free-lancer-1.onrender.com/api/bids/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log(response.data); // Log the response data
        setBids(response.data.bids); // Access the bids array from the response
      } catch (error) {
        setError('Failed to fetch bids');
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, [token]);

  // Access applied jobs from Redux store
  const appliedJobs = useSelector((state) => state.jobs.appliedJobs);

  const handleMessageClick = (freelancerId) => {
    console.log(`Message button clicked for freelancer ID: ${freelancerId}`);
    // Implement messaging functionality here
  };

  return (
    <div className="applied-jobs-container">
      <h2>Applied Jobs</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : bids.length === 0 ? (
        <p>No bids found.</p>
      ) : (
        bids.map((bid) => (
          <div key={bid._id} className="job-card">
            <h3>Job Title: {bid.jobId.title}</h3>
            <p>Amount: $ {bid.amount}</p>
            <p>Proposal: {bid.proposal}</p>
            <p>Freelancer ID: {bid.freelancerId}</p>
            <button onClick={() => handleMessageClick(bid.freelancerId)}>Message</button>
          </div>
        ))
      )}
    </div>
  );
};

export default AppliedJobs;
