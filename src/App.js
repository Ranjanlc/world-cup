import { useCallback, useContext, useEffect, useState } from 'react';
import Login from './components/Login/Login';
import Layout from './components/Layout/Layout';
import { Route, Routes, HashRouter } from 'react-router-dom';
import Matches from './components/Match/Match';
import FootballContext from './store/football-context';
import AllMatches from './components/Match/AllMatch';
function App() {
  const ctx = useContext(FootballContext);
  const fetchMatchesHandler = useCallback(async () => {
    try {
      const response = await fetch('/match', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzc5MDY2MmZkOWFhYzIyNjc1NWM3NGEiLCJpYXQiOjE2Njg5OTU3NDYsImV4cCI6MTY2OTA4MjE0Nn0.lBicyACEsqMgaDIpLEt-o36fdmz20N3G7eNZtg498NI',
        },
      });
      if (!response.ok) throw new Error('Please refresh after 1-2 minutes ');
      const data = await response.json();
      console.log(data);
      ctx.setMatches(data.data);
    } catch (err) {
      console.log(err.message);
    }
  }, []);
  useEffect(() => {
    fetchMatchesHandler();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />
      <Route
        path="/featured-matches"
        element={
          <Layout>
            <Matches />
          </Layout>
        }
      />
      <Route
        path="/all-matches"
        element={
          <Layout>
            <AllMatches />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
