import { useNavigate } from 'react-router-dom';
import classes from './MatchList.module.css';
const MatchList = (props) => {
  const { homeTeam, awayTeam, awayFlag, homeFlag, id } = props;
  const navigate = useNavigate();
  // Added clickHandler to button instead of link because of some design issues.
  const gotoClickHandler = () => {
    navigate(id);
  };
  return (
    <li className={classes.item} style={{ userSelect: 'none' }}>
      <figure className={classes.name}>
        <div className={classes['home-team']}>
          <img src={homeFlag} /> {homeTeam}
        </div>
        <div>vs</div>
        <div className={classes['away-team']}>
          <img src={awayFlag} /> {awayTeam}
        </div>
      </figure>
      <button className={classes.btn} onClick={gotoClickHandler}>
        Go to predictions &#8594;
      </button>
    </li>
  );
};
export default MatchList;
