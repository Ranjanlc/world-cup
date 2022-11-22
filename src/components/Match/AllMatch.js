import { useContext } from 'react';
import FootballContext from '../../store/football-context';
import MatchList from './MatchList';
import classes from './Match.module.css';
import usePagination from '../../helpers/use-pagination';
const AllMatches = (props) => {
  const ctx = useContext(FootballContext);
  const [
    page,
    startingIndex,
    endingIndex,
    pageIncreaseHandler,
    pageDecreaseHandler,
  ] = usePagination();
  console.log(ctx.matches.slice(startingIndex, endingIndex));
  const totalPages = Math.ceil(ctx.matches.length / 5);
  return (
    <ul style={{ padding: 0, listStyle: 'none' }}>
      {ctx.matches.slice(startingIndex, endingIndex).map((el) => (
        <MatchList
          key={el._id}
          homeTeam={el.home_team_en}
          awayTeam={el.away_team_en}
          awayFlag={el.away_flag}
          homeFlag={el.home_flag}
        ></MatchList>
      ))}
      <li className={classes.item}>
        {page !== 1 && (
          <button onClick={pageDecreaseHandler}>&#8592; Previous Page</button>
        )}
        <span>
          {page}/{totalPages}
        </span>
        {<button onClick={pageIncreaseHandler}>Next Page &#8594;</button>}
      </li>
    </ul>
  );
};
export default AllMatches;
