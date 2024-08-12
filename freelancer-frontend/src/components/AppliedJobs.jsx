import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './AppliedJobs.module.css';

const AppliedJobs = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await axios.get('https://free-lancer-1.onrender.com/api/bids/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setBids(response.data.bids);
      } catch (error) {
        setError('Failed to fetch bids');
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, [token]);

  const handleMessageClick = (receiverId, jobId) => {
    navigate(`/send-message/${jobId}`, { state: { receiverId } });
  };

  return (
    <div className={styles.container}>
      <h2>Applied Jobs</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : bids.length === 0 ? (
        <p>No bids found.</p>
      ) : (
        bids.map((bid) => (
          <div key={bid._id} className={styles.jobCard}>
            <h3>Job Title: {bid.jobId.title}</h3>
            <p>Amount: $ {bid.amount}</p>
            <p>Proposal: {bid.proposal}</p>
            <p>Freelancer ID: {bid.freelancerId}</p>
            {/* <button onClick={() => handleMessageClick(bid.freelancerId, bid.jobId._id)}>Message</button> */}
          </div>
        ))
      )}
    </div>
  );
};

export default AppliedJobs;
