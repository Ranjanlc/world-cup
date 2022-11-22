import { useContext } from 'react';
import { Link } from 'react-router-dom';

// import AuthContext from '../../store/auth-context';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  // const authCtx = useContext(AuthContext);

  // const isLoggedIn = authCtx.isLoggedIn;

  // const logoutHandler = () => {
  //   authCtx.logout();
  //   // optional: redirect the user
  // };
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <Link to="/">
            <div className={classes.logo}>
              Welcome to world cup prediction site,
            </div>
            <div className={classes.desc}>
              Login or Create Account to follow along.
            </div>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
