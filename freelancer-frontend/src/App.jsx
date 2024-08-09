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
import AuthWrapper from './components/AuthWrapper';
import CreateJob from './components/CreateJob';
import MyJobs from './components/MyJobs';
import ViewBids from './components/ViewBids';

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
            <Route path="/" element={<AuthWrapper><Job /></AuthWrapper>} />
            {/* <Route path="/applied-jobs" element={<AuthWrapper role="freelancer"><AppliedJobs /></AuthWrapper>} /> */}
            <Route path="/applied-jobs" element={<AppliedJobs />} />
           <Route path="/jobs/:jobId/bid" element={<BidForm />} />

            <Route path="/post-job" element={<AuthWrapper role="client"><PostJob /></AuthWrapper>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
