import React, { useState, useEffect } from 'react';
import AddNew from './AddNew';
import Loading from '../Shared/Loading';
import Category from '../../interfaces/Category';
import Transaction from '../../interfaces/Transaction';
import { loadState, saveState } from '../../localStorage';
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
    console.log("hit");
  }, [isLoading]);

  function handleSubmit(event: React.FormEvent<HTMLElement>) {
    event.preventDefault();

    const transaction: Transaction = {
      id: transactions.length,
      category: 3,
      description: "test",
      amount: 5,
      dateCreated: new Date().getUTCDate(),
      dateUpdated: new Date().getUTCDate()
    };

    const updatedList = transactions;
    updatedList.push(transaction);

    setTransactions(updatedList);
    saveState(stateId, updatedList);
    setLoading(true);
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
          <AddNew onSubmit={handleSubmit} />
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
