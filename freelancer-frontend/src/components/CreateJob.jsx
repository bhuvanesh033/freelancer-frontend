import React, { useState } from 'react';
import axios from 'axios';

const CreateJob = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Verify the token is correct
  
    if (!token) {
      console.error('No token found, authorization denied');
      return;
    }
  
    const jobData = {
      title,
      description,
      budget,
      deadline,
    };
  
    try {
      const response = await axios.post(
        'https://free-lancer-1.onrender.com/api/jobs/',
        jobData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure token is properly included
          },
        }
      );
  
      console.log('Job created successfully', response.data);
      // Handle successful job creation, e.g., navigate to another page or show a success message
    } catch (error) {
      console.error('Error creating job:', error.response?.data?.msg || error.message);
      // Handle error, e.g., show an error message
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Job</h2>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Budget:</label>
        <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} />
      </div>
      <div>
        <label>Deadline:</label>
        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
      </div>
      <button type="submit">Create Job</button>
    </form>
  );
};

export default CreateJob;
