import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <NavLink to="/" title="Home">
          <h1>Spendy</h1>
        </NavLink>
        <nav>
          <NavLink to="/" activeClassName="active">Home</NavLink>
          <NavLink to="/transactions" activeClassName="active">Transactions</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
