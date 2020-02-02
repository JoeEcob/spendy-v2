import React, { useState, useEffect } from 'react';
import Loading from '../Shared/Loading';
import { loadState, saveState } from '../../localStorage';
import './FitPlan.css';

const FitPlan: React.FC = () => {
  const stateId: string = "spendy.fitPlan";
  const daysOfWeek: {[key: string]: string} = {
    "Mon": "Monday",
    "Tue": "Tuesday",
    "Wed": "Wednesday",
    "Thur": "Thursday",
    "Fri": "Friday",
    "Sat": "Saturday",
    "Sun": "Sunday"
  };
  const [isLoading, setLoading] = useState(true);
  const [fitPlanData, setFitPlanData] = useState([]);

  useEffect(() => {
    setFitPlanData(loadState(stateId) as [] || []);

    setLoading(false);
  }, []);

  useEffect(() => saveState(stateId, fitPlanData), [fitPlanData]);

  function renderTable(): JSX.Element {
    return (
      <table className="transactions">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Morning</th>
            <th>Lunch</th>
            <th>Dinner</th>
            <th>Evening</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(daysOfWeek).map(key => (
            <React.Fragment key={key}>
              <tr>
                <td rowSpan={2} title={daysOfWeek[key]}>{key}</td>
                <td>Food</td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
              </tr>
              <tr>
                <td>Fitness</td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="fit-plan">
      {isLoading
        ? <Loading />
        : renderTable()}
    </div>
  );
}

export default FitPlan;
