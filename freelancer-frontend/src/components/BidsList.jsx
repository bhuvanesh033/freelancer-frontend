import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './BidsList.module.css'; // Import the CSS module

const BidsList = () => {
  const { jobId } = useParams();
  const [bids, setBids] = useState([]);
  const [job, setJob] = useState(null); // To store job details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBidsAndJob = async () => {
      try {
        const [bidsRes, jobRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/bids/${jobId}`),
          axios.get(`http://localhost:5000/api/jobs/${jobId}`) // Fetch job details
        ]);
        setBids(bidsRes.data);
        setJob(jobRes.data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchBidsAndJob();
  }, [jobId]);

  const acceptBid = async (bid) => {
    try {
      // Fetch job details to get client ID and job description
      const jobRes = await axios.get(`http://localhost:5000/api/jobs/${jobId}`);
      const job = jobRes.data;

      // Sending the message to the freelancer
      await axios.post(`http://localhost:5000/api/messages/${jobId}`, {
        message: 'I accept your bid',
        receiverId: bid.freelancerId._id
      });

      // Storing the accepted bid data in MongoDB
      await axios.post(`http://localhost:5000/api/acceptedBids`, {
        jobId: jobId,
        freelancerId: bid.freelancerId._id,
        clientId: job.clientId._id, // Use the client ID from the job details
        amount: bid.amount,
        jobDescription: job.description, // Use the job description from the job details
        date: new Date().toISOString()
      });

      // Create or retrieve a conversation
      await axios.post('http://localhost:5000/api/conversation', {
        jobId: jobId,
        freelancerId: bid.freelancerId._id,
        clientId: job.clientId._id
      });

      alert('Bid accepted, message sent, and conversation created!');
    } catch (err) {
      console.error('Failed to accept bid', err);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Bids for Job ID: {jobId}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : bids.length > 0 ? (
        bids.map((bid) => (
          <div key={bid._id} className={styles['bid-card']}>
            <p><strong>Freelancer:</strong> {bid.freelancerId.name}</p>
            <p><strong>Amount:</strong> $ {bid.amount}</p>
            <p><strong>Proposal:</strong> {bid.proposal}</p>
            <button onClick={() => acceptBid(bid)}>Accept Bid</button>
          </div>
        ))
      ) : (
        <p>No bids found</p>
      )}
    </div>
  );
};

export default BidsList;
