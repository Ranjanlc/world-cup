import { Fragment } from 'react';
import classes from './Predictions.module.css';
const Predictions = (props) => {
  const { predictionData } = props;
  //   console.log(predictionData);
  const predictionList = predictionData.map((el) => (
    <Fragment>
      <li key={Math.random().toFixed(5)} className={classes.list}>
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
