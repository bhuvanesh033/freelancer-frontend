import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { applyJob } from '../redux/JobSlice';

const BidForm = () => {
  const location = useLocation();
  const { job } = location.state;
  const [amount, setAmount] = useState('');
  const [proposal, setProposal] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const bidDetails = {
      ...job,
      amount,
      proposal
    };
    dispatch(applyJob(bidDetails));
    navigate('/applied-jobs');
  };

  return (
    <div>
      <h2>Bid on {job.title}</h2>
      <form onSubmit={handleBidSubmit}>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Proposal:</label>
          <textarea
            value={proposal}
            onChange={(e) => setProposal(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Bid</button>
      </form>
    </div>
  );
};

export default BidForm;
