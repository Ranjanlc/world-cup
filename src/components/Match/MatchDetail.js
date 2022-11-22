import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Outlet, useParams } from 'react-router-dom';
import FootballContext from '../../store/football-context';
import Predictions from '../Predictions/Predictions';
import classes from './MatchDetail.module.css';
const MatchDetail = (props) => {
  const params = useParams();
  const [indvData, setIndvData] = useState({});
  const [showInput, setShowInput] = useState(false);
  const previouslyPredicted = localStorage.getItem('predicted') === 'true';
  const [alreadyPredicted, setAlreadyPredicted] = useState(previouslyPredicted);
  const [predictionData, setPredictionData] = useState([]);
  const homePredictionRef = useRef();
  const awayPredicitonRef = useRef();
  const matchId = params.matchId;
  // console.log(matchId);
  const ctx = useContext(FootballContext);
  const getSingleMatch = useCallback(async () => {
    try {
      const response = await fetch(`/match/${matchId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ctx.token}`,
        },
      });
      const data = await response.json();
      // console.log(data);
      setIndvData(data.data.at(0));
    } catch (err) {
      console.log('errror');
    }
  }, []);
  useEffect(() => {
    getSingleMatch();
  }, []);
  // console.log(indvData);
  const awayFlag = <img src={indvData.away_flag} className={classes.flag} />;
  const homeFlag = <img src={indvData.home_flag} className={classes.flag} />;
  const gameStarted = indvData.time_elapsed !== 'notstarted';
  console.log(gameStarted);
  const fetchPredictionHandler = useCallback(async () => {
    console.log('call');
    try {
      const response = await fetch(
        `https://world-cup-fa973-default-rtdb.firebaseio.com/predictions/${matchId}.json`
      );
      // console.log(response);
      const data = await response.json();
      setPredictionData(Object.values(data));
    } catch (err) {}
  }, []);
  useEffect(() => {
    fetchPredictionHandler();
  }, [fetchPredictionHandler]);
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
            prediction: `${indvData.home_team_en} ${homePredictionRef.current.value}-${awayPredicitonRef.current.value} ${indvData.away_team_en}`,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem('predicted', 'true');
          setAlreadyPredicted(true);
          fetchPredictionHandler();
        })
        .catch((err) => {
          console.log(err.message);
        });
      setShowInput(false);
    }
  };
  const predictionEnabled = (!gameStarted && !alreadyPredicted) || !gameStarted;
  return (
    <Fragment>
      <div className={classes.container}>
        {homeFlag}
        <span className={classes.detail}>
          {indvData?.home_team_en} {gameStarted && indvData.home_score} vs{'  '}
          {gameStarted && indvData.away_score}
        </span>
        {awayFlag}
        <span className={classes.detail}>{indvData?.away_team_en}</span>
      </div>
      <hr></hr>
      {showInput && (
        <div className="centered">
          <form className={classes.form}>
            <img src={indvData.home_flag} />
            <span className={classes.detail}>
              {indvData?.home_team_en} {gameStarted && indvData.home_score}{' '}
              <input type="number" ref={homePredictionRef} min={0} max={10} />{' '}
              vs
              {gameStarted && indvData.away_score}
            </span>
            <input type="number" min={0} max={10} ref={awayPredicitonRef} />
            <img src={indvData.away_flag} />
            <span className={classes.detail}>{indvData?.away_team_en}</span>
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
      <Predictions predictionData={predictionData} />
    </Fragment>
  );
};
export default MatchDetail;
