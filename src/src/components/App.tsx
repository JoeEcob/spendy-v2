import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './Shared/Header';
import Home from './Home/Home';
import Transactions from './Transactions/Transactions';
import NotFound from './Shared//NotFound';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/transactions" component={Transactions} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
