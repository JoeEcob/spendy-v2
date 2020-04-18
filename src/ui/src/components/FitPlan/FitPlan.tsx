import React, { useState, useEffect } from 'react';
import Loading from '../Shared/Loading';
import { loadState, saveState } from '../../localStorage';
import FitPlanCell from './FitPlanCell';
import IDataTable from './IDataTable';
import './FitPlan.css';

const FitPlan: React.FC = () => {
  const stateId: string = "spendy.fitPlan";
  const columnHeaders = ["Morning", "Lunch", "Dinner", "Evening"];
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const [isLoading, setLoading] = useState(true);

  /**
   * food: {
   *   columnHeader1: [mon, tues, wed, thurs, fri, sat, sun]
   *   columnHeader2: [mon, tues, wed, thurs, fri, sat, sun]
   * }
   */
  const [foodData, setFoodData] = useState<IDataTable>(initNewDataTable());
  const [fitnessData, setFitnessData] = useState<IDataTable>(initNewDataTable());

  useEffect(() => {
    const foodData = loadState(`${stateId}.food`) as IDataTable;
    if (foodData) {
      setFoodData(foodData);
    }

    const fitnessData = loadState(`${stateId}.fitness`) as IDataTable;
    if (fitnessData) {
      setFitnessData(fitnessData);
    }

    setLoading(false);
  }, []);

  useEffect(() => saveState(`${stateId}.food`, foodData), [foodData]);
  useEffect(() => saveState(`${stateId}.fitness`, fitnessData), [fitnessData]);

  function initNewDataTable(): IDataTable {
    const result: IDataTable = {};
    for (const header of columnHeaders) {
      // By initing an array to the correct size it means we can shortcut a
      // validation check in the handSubmit method.
      result[header] = daysOfWeek.map(value => "");
    }
    return result;
  }

  function handleFoodSubmit(newValue: string, columnHeader: string, dayOfWeekIndex: number): void {
    // TODO - fix this hacky way of avoiding state mutation
    var newFoodData = JSON.parse(JSON.stringify(foodData))

    // This should be an array of data by day of week number
    const dataForColumnHeaderByDayOfWeek = newFoodData[columnHeader];

    dataForColumnHeaderByDayOfWeek[dayOfWeekIndex] = newValue;
    setFoodData(newFoodData);
  }

  function handleFitnessSubmit(newValue: string, columnHeader: string, dayOfWeekIndex: number): void {
    // TODO - fix this hacky way of avoiding state mutation
    var newFitnessData = JSON.parse(JSON.stringify(fitnessData))

    // This should be an array of data by day of week number
    const dataForColumnHeaderByDayOfWeek = newFitnessData[columnHeader];

    dataForColumnHeaderByDayOfWeek[dayOfWeekIndex] = newValue;
    setFitnessData(newFitnessData);
  }

  function renderTable(): JSX.Element {
    return (
      <table className="transactions">
        <thead>
          <tr>
            <th></th>
            <th></th>
            {columnHeaders.map(header => <th key={header}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {daysOfWeek.map((dayOfWeek, dayOfWeekIndex) => (
            <React.Fragment key={dayOfWeek}>
              <tr>
                <td className="row-header"rowSpan={2}>{dayOfWeek}</td>
                <td className="row-header">Food</td>
                {columnHeaders.map(colHeader => <FitPlanCell
                  key={`food${colHeader}`}
                  callback={value => handleFoodSubmit(value, colHeader, dayOfWeekIndex)}
                  text={foodData[colHeader][dayOfWeekIndex]} />)}
              </tr>
              <tr>
                <td className="row-header">Fitness</td>
                {columnHeaders.map(colHeader => <FitPlanCell
                  key={`fitness${colHeader}`}
                  callback={value => handleFitnessSubmit(value, colHeader, dayOfWeekIndex)}
                  text={fitnessData[colHeader][dayOfWeekIndex]} />)}
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
