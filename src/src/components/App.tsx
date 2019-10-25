import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './Shared/Header';
import Charts from './Home/Charts';
import Transactions from './Transactions/Transactions';
import NotFound from './Shared//NotFound';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route exact path="/" component={Charts} />
        <Route path="/transactions" component={Transactions} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
