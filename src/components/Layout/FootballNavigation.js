import classes from './FootballNavigation.module.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import FootballContext from '../../store/football-context';
const FootballNavigation = (props) => {
  const ctx = useContext(FootballContext);
  const userName = ctx.userName;
  const listClickHandler = (e) => {
    console.log(e.target.parentElement);
    console.log(
      Array.from(e.target.closest('ul').children).filter((el) =>
        el === e.target.parentElement
          ? (el.className = classes.active)
          : (el.className = '')
      )
    );
  };
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>Welcome {userName},</div>
      </Link>
      <nav>
        <ul onClick={listClickHandler}>
          <li className={classes.active}>
            <Link to="/featured-matches">Upcoming matches</Link>
          </li>
          <li>
            <Link to="/all-matches">All matches</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default FootballNavigation;
