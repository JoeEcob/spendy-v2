import React from 'react';
import './YearProgress.css';

const YearProgress: React.FC = () => {
  function getPercentage(): number {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const numberOfDays = Math.floor(diff / oneDay);

    return Math.floor(numberOfDays / 366 * 100);
  }

  return (
    <div className="year-progress">
      <h2>Year Progress</h2>
      <div className="graph-container">
        <div className="percentage" style={{ width: `${getPercentage()}%` }}></div>
      </div>
      <span className="label">{getPercentage()}%</span>
    </div>
  );
}

export default YearProgress;
