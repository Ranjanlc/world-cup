import { useCallback, useContext, useEffect, useState } from 'react';
import Login from './components/Login/Login';
import Layout from './components/Layout/Layout';
import { Route, Routes, HashRouter } from 'react-router-dom';
import Matches from './components/Match/Match';
import FootballContext from './store/football-context';
import AllMatches from './components/Match/AllMatch';
function App() {
  const ctx = useContext(FootballContext);
  console.log(ctx.token);
  const fetchMatchesHandler = useCallback(async () => {
    console.log('called');
    try {
      const response = await fetch('/match', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ctx.token}`,
        },
      });
      console.log(response.statusText, 'matches');
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      console.log(data);
      ctx.setMatches(data.data);
    } catch (err) {
      if (err.message === 'Unauthorized') {
        ctx.setTokenHandler();
      } else {
        console.log('Please refresh after 1-2 minutes');
      }
    }
  }, [ctx.token]);
  useEffect(() => {
    fetchMatchesHandler();
  }, [fetchMatchesHandler]);

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
