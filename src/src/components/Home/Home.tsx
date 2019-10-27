import React from 'react';
import Charts from './Charts';
import Reminders from './Reminders';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <Charts />
      <Reminders />
    </div>
  );
};

export default Home;
