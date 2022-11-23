import { Fragment } from 'react';
import classes from './Layout.module.css';
import MainNavigation from './MainNavigation';
import FootballNavigation from './FootballNavigation';
const Layout = (props) => {
  const { login } = props;
  return (
    <Fragment>
      {login ? <MainNavigation /> : <FootballNavigation />}
      <main className={classes.main}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
