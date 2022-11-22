import classes from './MatchList.module.css';
const MatchList = (props) => {
  const { homeTeam, awayTeam, awayFlag, homeFlag } = props;
  return (
    <li className={classes.item}>
      <figure className={classes.name}>
        <img src={homeFlag} /> {homeTeam} vs <img src={awayFlag} /> {awayTeam}{' '}
      </figure>
      <button className={classes.btn}> Go to predictions &#8594;</button>
    </li>
  );
};
export default MatchList;
