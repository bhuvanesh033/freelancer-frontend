import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Messages.module.css'; // Import the CSS module

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/messages/freelancer');
        setMessages(res.data);
      } catch (err) {
        setError('Failed to fetch messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Messages</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : messages.length > 0 ? (
        messages.map((message) => (
          <div key={message._id} className={styles['message-card']}>
            <h3>From: {message.senderId.name}</h3>
            <p>Message: {message.message}</p>
            <p>Job Description: {message.jobId ? message.jobId.description : 'No job details'}</p>
            <p className={styles.date}>Date: {new Date(message.createdAt).toLocaleDateString()}</p>
          </div>
        ))
      ) : (
        <p>No messages found</p>
      )}
    </div>
  );
};

export default Messages;
