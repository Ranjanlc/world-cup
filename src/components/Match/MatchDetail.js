import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import FootballContext from '../../store/football-context';
import LoadingSpinner from '../UI/LoadingSpinner';
import Predictions from '../Predictions/Predictions';
import classes from './MatchDetail.module.css';
const MatchDetail = (props) => {
  const params = useParams();
  const matchId = params.matchId;
  const [indvData, setIndvData] = useState({});
  const [showInput, setShowInput] = useState(false);
  // Used this state to add it as dependency to reload predictions in Predictions.js
  const [reloadPrediction, setReloadPrediction] = useState(false);
  const previouslyPredicted = localStorage.getItem('predicted') === matchId;
  const [alreadyPredicted, setAlreadyPredicted] = useState(previouslyPredicted);
  const [isLoading, setIsLoading] = useState(true);
  const homePredictionRef = useRef();
  const awayPredicitonRef = useRef();

  // console.log(matchId);
  const ctx = useContext(FootballContext);
  const getSingleMatch = useCallback(async () => {
    try {
      const response = await fetch(
        `https://express-worldcup.vercel.app/fetch?data=detail&Id=${matchId}`,
        // `http://localhost:5000/fetch?data=detail&Id=${matchId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ctx.token}`,
          },
        }
      );
      const data = await response.json();
      setIndvData(data.data.at(0));
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  }, []);
  useEffect(() => {
    getSingleMatch();
  }, []);
  // console.log(indvData);
  const awayFlag = <img src={indvData.away_flag} className={classes.flag} />;
  const homeFlag = <img src={indvData.home_flag} className={classes.flag} />;
  const homeTeamName = indvData.home_team_en;
  const awayTeamName = indvData.away_team_en;
  const gameStarted = indvData.time_elapsed !== 'notstarted';
  console.log(gameStarted);
  // We stored prediction in firebase
  const addPredictionHandler = () => {
    if (!showInput) {
      setShowInput(true);
    } else {
      if (
        homePredictionRef.current.value === '' ||
        awayPredicitonRef.current.value === ''
      )
        return;
      fetch(
        `https://world-cup-fa973-default-rtdb.firebaseio.com/predictions/${matchId}.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: ctx.userName || 'Anonymous',
            prediction: `${homeTeamName} ${homePredictionRef.current.value}-${awayPredicitonRef.current.value} ${awayTeamName}`,
          }),
        }
      )
        .then((response) => response.json())
        .then(() => {
          // WE set matchId too because it would help us to disable only correct predictions.
          localStorage.setItem(`predicted`, matchId);
          setAlreadyPredicted(true);
          setReloadPrediction(true);
        })
        .catch((err) => {
          console.log(err.message);
        });
      setShowInput(false);
    }
  };

  const predictionEnabled = !gameStarted && !alreadyPredicted;
  return (
    <Fragment>
      {isLoading && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && (
        <div className={classes.container}>
          {homeFlag}
          <span className={classes.detail}>
            {homeTeamName} {gameStarted && indvData.home_score} vs
            {'  '}
            {gameStarted && indvData.away_score}
          </span>
          {awayFlag}
          <span className={classes.detail}>{awayTeamName}</span>
        </div>
      )}
      <hr></hr>
      {showInput && (
        <div className="centered">
          <form className={classes.form}>
            <img src={indvData.home_flag} />
            <span className={classes.detail}>
              {homeTeamName} {gameStarted && indvData.home_score}{' '}
              <input type="number" ref={homePredictionRef} min={0} max={10} />{' '}
              vs
              {gameStarted && indvData.away_score}
            </span>
            <input type="number" min={0} max={10} ref={awayPredicitonRef} />
            <img src={indvData.away_flag} />
            <span className={classes.detail}>{indvData?.awayTeamName}</span>
          </form>
        </div>
      )}
      <div className="centered">
        <button
          className={classes.btn}
          onClick={addPredictionHandler}
          disabled={!predictionEnabled}
        >
          Add predictions
        </button>
      </div>
      <Predictions matchId={matchId} reloadPrediction={reloadPrediction} />
    </Fragment>
  );
};
export default MatchDetail;
