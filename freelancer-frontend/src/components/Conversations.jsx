import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Conversations.module.css'; // Assuming you're using CSS Modules

const Conversations = () => {
  const user = useSelector(state => state.auth.user);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        try {
          console.log('Fetching conversations for user ID:', user.id); // Log user ID
          const response = await axios.get(`https://free-lancer-1.onrender.com/api/conversations/${user.id}`, {
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
      } else {
        console.log('No user ID found'); // Log if user ID is missing
      }
    };

    fetchData();
  }, [user]);

  const handleMessageClick = (conversationId) => {
    console.log('Clicked conversation ID:', conversationId); // Log conversation ID on click
    if (conversationId) {
      navigate(`/chat/${conversationId}`); // Redirect to chat page
    } else {
      console.error('No conversation ID provided');
    }
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
                <span key={participant.id} className={styles.participant}>
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
