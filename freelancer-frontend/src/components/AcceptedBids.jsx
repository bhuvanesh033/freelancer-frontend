import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AcceptedBids = () => {
  const [acceptedBids, setAcceptedBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAcceptedBids = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/acceptedBids/client');
        setAcceptedBids(res.data);
      } catch (err) {
        setError('Failed to fetch accepted bids');
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedBids();
  }, []);

  return (
    <div>
      <h2>Accepted Bids</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : acceptedBids.length > 0 ? (
        acceptedBids.map((bid) => (
          <div key={bid._id}>
            <h3>Job Description: {bid.jobId.description}</h3>
            <p>Freelancer: {bid.freelancerId.name}</p>
            <p>Amount: ${bid.amount}</p>
            <p>Date: {new Date(bid.date).toLocaleDateString()}</p>
          </div>
        ))
      ) : (
        <p>No accepted bids found</p>
      )}
    </div>
  );
};

export default AcceptedBids;
