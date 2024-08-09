import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SendMessage = () => {
  const { jobId } = useParams(); // Extract jobId from URL params
  const location = useLocation();
  const navigate = useNavigate();

  const { receiverId } = location.state || {}; // Extract receiverId from location state

  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://free-lancer-1.onrender.com/api/messages/${jobId}`, {
        message,
        receiverId,
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Message sent successfully!');
      navigate('/applied-jobs'); // Redirect to a different page if needed
    } catch (error) {
      setError('Failed to send message');
      console.error('Error sending message:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="send-message-container">
      <h2>Send Message</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
        />
        <button type="submit">Send Message</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SendMessage;
