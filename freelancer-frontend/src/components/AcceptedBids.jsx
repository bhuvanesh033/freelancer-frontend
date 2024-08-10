import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AcceptedBids = () => {
  const [acceptedBids, setAcceptedBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBid, setSelectedBid] = useState(null);
  const [review, setReview] = useState({ rating: '', review: '' });
  const [payment, setPayment] = useState({ amount: '' });
  const [paymentStatus, setPaymentStatus] = useState(null);

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

  const handleReviewChange = (e) => {
    const { name, value } = e.target;

    if (name === 'rating') {
      const ratingValue = Math.min(Math.max(Number(value), 1), 5); // Ensure rating is between 1 and 5
      setReview({ ...review, [name]: ratingValue });
    } else {
      setReview({ ...review, [name]: value });
    }
  };

  const handlePaymentChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const handleSubmitReview = async (jobId, freelancerId) => {
    try {
      await axios.post(`http://localhost:5000/api/reviews/${jobId}`, {
        ...review,
        freelancerId,
      });
      alert('Review posted successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to post review');
    }
  };

  const handleSubmitPayment = async (jobId, freelancerId) => {
    try {
      await axios.post(`http://localhost:5000/api/payments/${jobId}`, {
        amount: payment.amount,
        freelancerId,
      });
      alert('Payment sent successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to send payment');
    }
  };

  const checkPaymentStatus = async (jobId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/payments/${jobId}`);
      setPaymentStatus(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch payment status');
    }
  };

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
            <button onClick={() => setSelectedBid(bid)}>Post Review</button>
            <button onClick={() => setSelectedBid(bid)}>Send Payment</button>

            {selectedBid && (
              <div>
                <h3>Post a Review</h3>
                <input
                  type="number"
                  name="rating"
                  placeholder="Rating (1-5)"
                  value={review.rating}
                  onChange={handleReviewChange}
                  min="1"
                  max="5"
                  step="1"
                />
                <textarea
                  name="review"
                  placeholder="Review"
                  value={review.review}
                  onChange={handleReviewChange}
                />
                <button onClick={() => handleSubmitReview(selectedBid.jobId._id, selectedBid.freelancerId._id)}>
                  Submit Review
                </button>

                <h3>Send Payment</h3>
                <input
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  value={payment.amount}
                  onChange={handlePaymentChange}
                />
                <button onClick={() => handleSubmitPayment(selectedBid.jobId._id, selectedBid.freelancerId._id)}>
                  Send Payment
                </button>

                {paymentStatus && (
                  <div>
                    <h4>Payment Status</h4>
                    <p>Amount: ${paymentStatus.amount}</p>
                    <p>Date: {new Date(paymentStatus.date).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No accepted bids found</p>
      )}
    </div>
  );
};

export default AcceptedBids;
