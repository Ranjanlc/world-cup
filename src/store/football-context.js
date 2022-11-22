import { useState } from 'react';
import React from 'react';
const FootballContext = React.createContext({
  isLoggedIn: false,
  matches: [],
  setMatches: () => {},
  setLoggedIn: () => {},
  userName: '',
  setUserName: () => {},
  token: '',
  setTokenHandler: '',
});

export const FootballContextProvider = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [matchData, setMatchData] = useState([]);
  const existingName = localStorage.getItem('name');
  const [enterdName, setEnteredName] = useState(existingName);
  // WE did this to avoid unnecesary api calls to the server.
  const existingToken = localStorage.getItem('token');
  const [token, setToken] = useState(existingToken);
  const loginHandler = () => {
    setIsLogin(true);
  };
  const tokenRefreshHandler = async () => {
    const response = await fetch('/user/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'studylc29@gmail.com',
        password: 'Test1234',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.statusText, 'token');
    const data = await response.json();
    console.log(data.data.token);
    setToken(data.data.token);
    localStorage.setItem('token', data.data.token);
  };
  const setMatchDataHandler = (matches) => {
    console.log(matches);
    setMatchData(matches);
  };
  const setUserNameHandler = (name) => {
    localStorage.setItem('name', name);
    setEnteredName(name);
  };
  return (
    <FootballContext.Provider
      value={{
        setLoggedIn: loginHandler,
        isLoggedIn: isLogin,
        matches: matchData,
        setMatches: setMatchDataHandler,
        setUserName: setUserNameHandler,
        userName: enterdName,
        setTokenHandler: tokenRefreshHandler,
        token,
      }}
    >
      {props.children}
    </FootballContext.Provider>
  );
};
export default FootballContext;
