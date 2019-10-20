import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Category from '../interfaces/Category';
import Transaction from '../interfaces/Transaction';
import './Transactions.css';

const Transactions: React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  async function fetchTransactions(): Promise<void> {
    const response = await fetch('transactions');
    const data = await response.json();

    setLoading(false);
    setTransactions(data);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  function renderTable(transactions: Array<Transaction>): JSX.Element {
    return (
      <table className="transactions">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date Updated</th>
            <th>Date Created</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction =>
              <tr key={transaction.id}>
                <td>{transaction.description}</td>
                <td>{transaction.amount}</td>
                <td>{Category[transaction.category]}</td>
                <td>{transaction.dateUpdated}</td>
                <td>{transaction.dateCreated}</td>
              </tr>
          )}
        </tbody>
      </table>
    );
  }

  return (
    <div className="transactions">
      <h2>Transactions</h2>
      {isLoading
        ? <Loading />
        : renderTable(transactions)}
    </div>
  );
}

export default Transactions;
