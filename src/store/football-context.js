import { useState } from 'react';
import React from 'react';
const FootballContext = React.createContext({
  isLoggedIn: false,
  matches: [],
  setMatches: () => {},
  onLogin: () => {},
  user: '',
  setUserName: () => {},
});

export const FootballContextProvider = (props) => {
  const [loginData, setIsLoginData] = useState([]);
  const [matchData, setMatchData] = useState([]);
  const [enterdName, setEnteredName] = useState('');
  const loginHandler = (data) => {
    setIsLoginData(data);
  };
  const setMatchDataHandler = (matches) => {
    console.log(matches);
    setMatchData(matches);
  };
  const setUserNameHandler = (name) => {
    setEnteredName(name);
  };
  return (
    <FootballContext.Provider
      value={{
        onLogin: loginHandler,
        userData: loginData,
        matches: matchData,
        setMatches: setMatchDataHandler,
        setUserName: setUserNameHandler,
        userName: enterdName,
      }}
    >
      {props.children}
    </FootballContext.Provider>
  );
};
export default FootballContext;
