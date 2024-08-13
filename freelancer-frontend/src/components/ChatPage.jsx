import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styles from './ChatPage.module.css';

const ChatPage = () => {
  const { conversationId } = useParams();
  console.log('Conversation ID from useParams:', conversationId); // Debugging line

  const user = useSelector(state => state.auth.user); // Access user from Redux store
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Conversation ID:', conversationId); // Debugging line

    if (!conversationId) {
      console.error('Conversation ID is missing');
      return;
    }

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/chat-messages/${conversationId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [conversationId]);

  const handleSendMessage = async () => {
    if (user?.id) { // Ensure user ID is available
      try {
        await axios.post('http://localhost:5000/api/chat-message', {
          conversationId,
          senderId: user.id, // Use user ID from Redux store
          text: newMessage
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        setMessages([...messages, { senderId: user.id, text: newMessage, senderName: user.name }]);
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    } else {
      console.error('User not logged in');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <div key={index} className={styles.message}>
            <span className={styles.senderName}>{msg.senderId.name}</span> {/* Display sender's name */}
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
