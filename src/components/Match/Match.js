import { Fragment, useContext } from 'react';
import FootballContext from '../../store/football-context';
import MatchList from './MatchList';
import classes from './Match.module.css';
import { useState, useEffect, useCallback } from 'react';
import usePagination from '../../hooks/use-pagination';
const Matches = (props) => {
  const [
    page,
    startingIndex,
    endingIndex,
    pageIncreaseHandler,
    pageDecreaseHandler,
  ] = usePagination();
  const ctx = useContext(FootballContext);
  const fetchMatchesHandler = useCallback(async () => {
    console.log('called');
    try {
      const response = await fetch('/match', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ctx.token}`,
        },
      });
      console.log(response.statusText, 'matches');
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      console.log(data);
      ctx.setMatches(data.data);
    } catch (err) {
      if (err.message === 'Unauthorized') {
        ctx.setTokenHandler();
      } else {
        console.log('Please refresh after 1-2 minutes');
      }
    }
  }, [ctx.token]);
  useEffect(() => {
    fetchMatchesHandler();
  }, [fetchMatchesHandler]);

  // const totalPages = Math.ceil(ctx.matches.length / 5);
  // console.log(totalPages);
  // console.log(ctx.matches.slice(startingIndex, endingIndex));
  // const pageIncreaseHandler = () => {
  //   setPage((page) => ++page);
  // };
  // const pageBackHandler = () => {
  //   setPage((page) => --page);
  // };
  // const arrayEnd = page * 5 + 1;
  // const arrayStart = page === 1 ? page * 5 - 5 : page * 5 - 4;
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
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {matchComponent}
        <li
          className={classes.item}
          // style={{
          //   background: 'transparent',
          //   boxShadow: 'none',
          //   margin: 0,
          //   padding: 0,
          //   alignItems: 'flex-start',
          // }}
        >
          {page !== 1 && (
            <button onClick={pageDecreaseHandler}>&#8592; Previous Page</button>
          )}
          <span>
            {page}/{totalPages}
          </span>
          {page !== totalPages && (
            <button onClick={pageIncreaseHandler}>Next Page &#8594;</button>
          )}
        </li>
      </ul>
    </Fragment>
  );
};
export default Matches;
