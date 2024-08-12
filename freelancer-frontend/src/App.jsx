import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import store from './redux/store';
import Homelayout from './components/Homelayout';
import Job from './components/Jobs';
import AppliedJobs from './components/AppliedJobs';
import BidForm from './components/BidForm';
import PostJob from './components/PostJob';
import Login from './components/Login';
import Signup from './components/Signup';
import CreateJob from './components/CreateJob';
import MyJobs from './components/MyJobs';
import ViewBids from './components/ViewBids';
import SendMessage from './components/SendMessage'; // Adjust the path as needed
import BidsList from './components/BidsList';
import AcceptedBids from './components/AcceptedBids';  
import Messages from './components/Messages';
import Conversations from './components/Conversations';
import './index.css'; // or wherever Tailwind CSS is imported

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Homelayout />}>
            <Route path="/create-job" element={<CreateJob />} />
            <Route path="/my-jobs" element={<MyJobs />} />
            <Route path="/my-bids" element={<ViewBids />} />
            <Route path="/" element={<Job />} />
            <Route path="/applied-jobs" element={<AppliedJobs />} />
            <Route path="/jobs/:jobId/bid" element={<BidForm />} />
            <Route path="/send-message/:jobId" element={<SendMessage />} />
            <Route path="/bids/:jobId" element={<BidsList />} />
            <Route path="/accepted-bids" element={<AcceptedBids />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/conversations" element={<Conversations />} />
            <Route path="/post-job" element={<PostJob />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
