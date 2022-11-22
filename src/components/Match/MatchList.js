import { Link } from 'react-router-dom';
import classes from './MatchList.module.css';
const MatchList = (props) => {
  const { homeTeam, awayTeam, awayFlag, homeFlag, id } = props;
  return (
    <li className={classes.item}>
      <figure className={classes.name}>
        <img src={homeFlag} /> {homeTeam} vs <img src={awayFlag} /> {awayTeam}{' '}
      </figure>
      <button className={classes.btn}>
        <Link className={classes.link} to={id}>
          Go to predictions &#8594;
        </Link>
      </button>
    </li>
  );
};
export default MatchList;
