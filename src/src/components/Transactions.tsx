import React, { useState, useEffect } from 'react';
import AddNewTransaction from './AddNewTransaction';
import Loading from './Loading';
import Category from '../interfaces/Category';
import Transaction from '../interfaces/Transaction';
import { loadState, saveState } from '../localStorage';
import './Transactions.css';

const Transactions: React.FC = () => {
  const stateId: string = "spendy.transactions";
  const [isLoading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([] as Transaction[]);

  useEffect(() => {
    const data = loadState(stateId) as Transaction[];
    setLoading(false);
    if (data) {
      setTransactions(data);
    }
  }, []);

  function handleSubmit(event: React.MouseEvent<HTMLElement>) {
    // do something...
    alert("click");
  }

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
          {transactions.length === 0 ? <tr><td colSpan={5}>Nothing to show!</td></tr> : null}
          <AddNewTransaction onSubmit={handleSubmit} />
        </tbody>
      </table>
    );
  }

  return (
    <div className="transactions">
      {isLoading
        ? <Loading />
        : renderTable(transactions)}
    </div>
  );
}

export default Transactions;
