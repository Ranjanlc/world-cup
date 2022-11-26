import { useCallback, useContext, useEffect, useState } from 'react';
import Predictions from './components/Predictions/Predictions';
import MatchDetail from './components/Match/MatchDetail';
import Login from './components/Login/Login';
import Layout from './components/Layout/Layout';
import { Route, Routes, Navigate } from 'react-router-dom';
import Matches from './components/Match/Match';
import FootballContext from './store/football-context';
import AllMatches from './components/Match/AllMatch';
// TODO:Add form validation everywhere
//TODO:Add Error handling
function App() {
  const ctx = useContext(FootballContext);
  const { isLoggedIn } = ctx;
  return (
    <Routes>
      <Route
        path="/"
        element={
          // We passed login to identify the layout selection in Layout.js
          <Layout login={'login'}>
            <Login />
          </Layout>
        }
      />
      <Route
        path="/featured-matches"
        element={
          isLoggedIn ? (
            <Layout>
              <Matches />
            </Layout>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route
        path="/all-matches"
        element={
          isLoggedIn ? (
            <Layout>
              <AllMatches />
            </Layout>
          ) : (
            <Navigate to="/" replace />
          )
        }
      ></Route>
      <Route
        path="/:any/:matchId/*"
        element={
          isLoggedIn ? (
            <Layout>
              <MatchDetail />
            </Layout>
          ) : (
            <Navigate to="/" replace />
          )
        }
      ></Route>
    </Routes>
  );
}

export default App;
