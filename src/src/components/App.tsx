import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Charts from './Charts';
import Transactions from './Transactions';
import NotFound from './NotFound';

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
