import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewBids = () => {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const res = await axios.get('https://free-lancer-1.onrender.com/api/bids/user', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        setBids(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch bids');
      }
    };

    fetchBids();
  }, []);

  return (
    <div>
      <h2>Bids for My Jobs</h2>
      {bids.length > 0 ? (
        bids.map((bid) => (
          <div key={bid._id}>
            <h3>{bid.jobId.title}</h3>
            <p>Freelancer: {bid.freelancerId.name}</p>
            <p>Bid Amount: {bid.amount}</p>
          </div>
        ))
      ) : (
        <p>No bids found</p>
      )}
    </div>
  );
};

export default ViewBids;
