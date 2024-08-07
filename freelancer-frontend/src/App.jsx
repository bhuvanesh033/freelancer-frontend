import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import store from './redux/store';
import Homelayout from './components/Homelayout';
import Job from './components/Jobs';
import AppliedJobs from './components/AppliedJobs';
import BidForm from './components/BidForm';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homelayout />}>
            <Route path="/" element={<Job />} />
            <Route path="/applied-jobs" element={<AppliedJobs />} />
            <Route path="/bid/:jobId" element={<BidForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
