import { Fragment, useContext } from 'react';
import FootballContext from '../../store/football-context';
import MatchList from './MatchList';
import classes from './Match.module.css';
import { useState, useEffect, useCallback } from 'react';
import usePagination from '../../hooks/use-pagination';
import LoadingSpinner from '../UI/LoadingSpinner';
const Matches = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [
    page,
    startingIndex,
    endingIndex,
    pageIncreaseHandler,
    pageDecreaseHandler,
  ] = usePagination();
  const ctx = useContext(FootballContext);

  const fetchMatchesHandler = useCallback(async () => {
    try {
      // setIsLoading(true);
      const response = await fetch('/match', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzc5MDY2MmZkOWFhYzIyNjc1NWM3NGEiLCJpYXQiOjE2NjkxNjk1MTAsImV4cCI6MTY2OTI1NTkxMH0.6k1-xjOVk7EgTIb_JXMXIe6VDWZU8TcVohsbQJJ3us0`,
        },
      });
      console.log(response, 'matches');
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      console.log(data);
      setIsLoading(false);
      ctx.setMatches(data.data);
    } catch (err) {
      if (err.message === 'Unauthorized' || err.message === '') {
        ctx.setTokenHandler();
      } else {
        console.log('Please refresh after 1-2 minutes');
      }
    }
  }, [ctx.token]);
  useEffect(() => {
    fetchMatchesHandler();
  }, [fetchMatchesHandler]);

  const matchComponent = ctx.matches
    .filter((el) => el.time_elapsed !== 'finished')
    .slice(startingIndex, endingIndex)
    .map((el) => {
      return (
        <MatchList
          key={el.id}
          homeTeam={el.home_team_en}
          awayTeam={el.away_team_en}
          awayFlag={el.away_flag}
          homeFlag={el.home_flag}
          homeScore={el.home_score}
          awayScore={el.away_score}
          timeElapsed={el.time_elapsed}
          id={el.id}
        ></MatchList>
      );
    });
  const totalPages = Math.ceil(
    ctx.matches.filter((el) => el.finished === 'FALSE').length / 5
  );
  return (
    <Fragment>
      {isLoading && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {matchComponent}
          <li className={classes.item}>
            {page !== 1 && (
              <button onClick={pageDecreaseHandler}>
                &#8592; Previous Page
              </button>
            )}
            <span>
              {page}/{totalPages}
            </span>
            {page !== totalPages && (
              <button onClick={pageIncreaseHandler}>Next Page &#8594;</button>
            )}
          </li>
        </ul>
      )}
    </Fragment>
  );
};
export default Matches;
