import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

const BidForm = () => {
    const { jobId } = useParams();
    const [amount, setAmount] = useState('');
    const [proposal, setProposal] = useState('');
    const navigate = useNavigate();

    const handleSubmitBid = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token'); // Assuming you store JWT in local storage

        try {
            await axios.post(`/bids/${jobId}`, { amount, proposal }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            alert('Bid submitted successfully!');
            navigate('/'); // Redirect to homepage or any relevant page
        } catch (error) {
            alert('Failed to submit bid.');
            console.error('Error submitting bid:', error);
        }
    };

    return (
        <div>
            <h1>Submit Your Bid</h1>
            <form onSubmit={handleSubmitBid}>
                <div>
                    <label>Bid Amount:</label>
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
