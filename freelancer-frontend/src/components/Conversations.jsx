import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styles from './Conversations.module.css'; // Assuming you're using CSS Modules

const Conversations = () => {
  const user = useSelector(state => state.auth.user);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        try {
          const response = await axios.get(`http://localhost:5000/api/conversations/${user.id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          console.log('Conversations fetched:', response.data); // Log data for debugging
          setConversations(response.data);
        } catch (error) {
          console.error('Error fetching conversations:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [user]);

  const handleMessageClick = (conversationId) => {
    // Handle message button click
    console.log('Message button clicked for conversation:', conversationId);
    // Redirect or open message dialog
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.id) {
    return <div>User not logged in</div>;
  }

  return (
    <div className={styles.conversationsContainer}>
      {conversations.length === 0 ? (
        <div>No conversations found.</div>
      ) : (
        conversations.map(convo => (
          <div key={convo._id} className={styles.card}>
            <h3>{convo.jobTitle}</h3>
            <p>
              Participants: 
              {convo.participants.map(participant => (
                <span key={participant._id} className={styles.participant}>
                  {participant.name}
                </span>
              ))}
            </p>
            <button 
              className={styles.messageButton} 
              onClick={() => handleMessageClick(convo._id)}
            >
              Message
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Conversations;
