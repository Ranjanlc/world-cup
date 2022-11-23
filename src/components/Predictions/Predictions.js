import { Fragment, useCallback, useState, useEffect } from 'react';
import classes from './Predictions.module.css';
const Predictions = (props) => {
  const [predictionData, setPredictionData] = useState([]);
  const { matchId, reloadPrediction } = props;
  const fetchPredictionHandler = useCallback(async () => {
    try {
      const response = await fetch(
        `https://world-cup-fa973-default-rtdb.firebaseio.com/predictions/${matchId}.json`
      );
      // console.log(response);
      const data = await response.json();
      setPredictionData(Object.values(data));
    } catch (err) {}
  }, [reloadPrediction]);
  useEffect(() => {
    fetchPredictionHandler();
  }, [fetchPredictionHandler]);
  const predictionList = predictionData.map((el) => (
    <Fragment key={Math.random()}>
      <li className={classes.list}>
        <span className={classes.name}>{el.name}</span>:
        <span>{el.prediction}</span>
      </li>
      <hr className={classes.hr}></hr>
    </Fragment>
  ));
  return (
    <div className={classes.predictions}>
      <h1>Predictions:</h1>
      {predictionData.length !== 0 && (
        <ul className={classes.container}>{predictionList}</ul>
      )}
    </div>
  );
};
export default Predictions;
