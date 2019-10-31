import React, { useState, useEffect } from 'react';
import './Reminders.css';
import { loadState, saveState } from '../../localStorage';
import AddReminder from './AddReminder';

const Reminders: React.FC = () => {
  const namespace = 'spendy.reminders';
  const [daily, setDaily] = useState<string[]>([]);
  const [weekly, setWeekly] = useState<string[]>([]);
  const [monthly, setMonthly] = useState<string[]>([]);

  useEffect(() => {
    setDaily(loadState(`${namespace}.daily`) as string[] || []);
    setWeekly(loadState(`${namespace}.weekly`) as string[] || []);
    setMonthly(loadState(`${namespace}.monthly`) as string[] || []);
  }, []);

  useEffect(() => saveState(`${namespace}.daily`, daily), [daily]);

  useEffect(() => saveState(`${namespace}.weekly`, weekly), [weekly]);

  useEffect(() => saveState(`${namespace}.monthly`, monthly), [monthly]);

  function deleteReminder(content: string, index: number) {
    if (daily[index] === content) {
      setDaily(daily.filter((v, i) => i !== index));
    }

    if (weekly[index] === content) {
      setWeekly(weekly.filter((v, i) => i !== index));
    }

    if (monthly[index] === content) {
      setMonthly(monthly.filter((v, i) => i !== index));
    }
  }

  function renderReminder(content: string, index: number): JSX.Element {
    return (
      <div key={index} className="reminder-item">
        <span className="label">{content}</span>
        <small className="btn" onClick={() => deleteReminder(content, index)}>Delete</small>
      </div>
    );
  }

  return (
    <section className="reminders">
      <h2>Reminders</h2>

      <div className="reminder-group">
        <h3>
          Daily
          <AddReminder callback={text => setDaily(daily.concat(text))} />
        </h3>
        {daily.map(renderReminder)}
      </div>

      <div className="reminder-group">
        <h3>
          Weekly
          <AddReminder callback={text => setWeekly(weekly.concat(text))} />
        </h3>
        {weekly.map(renderReminder)}
      </div>

      <div className="reminder-group">
        <h3>
          Monthly
          <AddReminder callback={text => setMonthly(monthly.concat(text))} />
        </h3>
        {monthly.map(renderReminder)}
      </div>
    </section>
  );
}

export default Reminders;
