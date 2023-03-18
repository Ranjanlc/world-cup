import { Fragment, useContext } from 'react';
import FootballContext from '../../store/football-context';
import MatchList from './MatchList';
import classes from './Match.module.css';
import { useState, useEffect, useCallback } from 'react';
import usePagination from '../../hooks/use-pagination';
import LoadingSpinner from '../UI/LoadingSpinner';
const Matches = (props) => {
  const ctx = useContext(FootballContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [
    page,
    startingIndex,
    endingIndex,
    pageIncreaseHandler,
    pageDecreaseHandler,
  ] = usePagination();
  const fetchMatchesHandler = useCallback(async () => {
    setIsLoading(true);
    console.log('aayo ta');
    try {
      const response = await fetch(
        'https://express-worldcup.vercel.app/fetch?data=match',
        // 'http://localhost:5000/fetch?data=match',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ctx.token}`,
          },
        }
      );
      console.log(response);
      if (!response.ok) throw new Error(response.status);
      const data = await response.json();
      setIsLoading(false);
      ctx.setMatches(data.data);
    } catch (err) {
      if (err.message === '401') {
        ctx.setTokenHandler();
      } else {
        setError('Please refresh after 1-2 minutes');
      }
    }
  }, [ctx.token]);
  // Whenever ctx.token changes,we again fetch the match value
  useEffect(() => {
    if (ctx.matches.length === 0) {
      fetchMatchesHandler();
    }
  }, [fetchMatchesHandler]);
  // Filtered the match which haven't finished
  const filteredMatches = ctx.matches.filter(
    (el) =>
      el.home_team_en === 'Argentina' ||
      el.away_team_en === 'Argentina' ||
      el.home_team_en === 'France' ||
      el.away_team_en === 'France'
  );
  console.log(startingIndex, endingIndex);
  const matchComponent = filteredMatches
    .slice(startingIndex, endingIndex)
    .map((el) => {
      const {
        home_team_en: homeTeamName,
        away_team_en: awayTeamName,
        away_flag: awayFlag,
        home_flag: homeFlag,
        home_score: homeScore,
        away_score: awayScore,
        time_elapsed: timeElapsed,
      } = el;
      return (
        <MatchList
          key={el.id}
          homeTeam={homeTeamName}
          awayTeam={awayTeamName}
          awayFlag={awayFlag}
          homeFlag={homeFlag}
          homeScore={homeScore}
          awayScore={awayScore}
          timeElapsed={timeElapsed}
          id={el.id}
        />
      );
    });

  const totalPages = Math.ceil(filteredMatches.length / 6);
  return (
    <Fragment>
      {isLoading && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      {error.length !== 0 && (
        <div className="centered">
          Kindly refresh after 1-2 minutes coz of API limitations
        </div>
      )}
      {!isLoading && error.length === 0 && matchComponent.length !== 0 && (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {matchComponent}

          <li className={classes.item}>
            {page !== 1 && (
              <button onClick={pageDecreaseHandler}>
                &#8592; Previous Page
              </button>
            )}
            <span className={classes.page}>
              <span className={classes['previous-page']}>{page}</span>
              <span className={classes['next-page']}>/{totalPages}</span>
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
