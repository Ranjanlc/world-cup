import { useCallback, useContext, useEffect, useState } from 'react';
import Predictions from './components/Predictions/Predictions';
import MatchDetail from './components/Match/MatchDetail';
import Login from './components/Login/Login';
import Layout from './components/Layout/Layout';
import { Route, Routes, HashRouter, Navigate } from 'react-router-dom';
import Matches from './components/Match/Match';
import FootballContext from './store/football-context';
import AllMatches from './components/Match/AllMatch';
// TODO:Add form validation everywhere
function App() {
  const ctx = useContext(FootballContext);
  const { isLoggedIn } = ctx;
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
          isLoggedIn ? (
            <Layout>
              <Matches />
            </Layout>
          ) : (
            <Navigate to="/" replace />
          )
        }
      ></Route>

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
