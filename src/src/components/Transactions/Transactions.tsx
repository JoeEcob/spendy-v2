import React, { useState, useEffect } from 'react';
import TransactionForm from './TransactionForm';
import TransactionRow from './TransactionRow';
import Loading from '../Shared/Loading';
import ITransaction from '../../interfaces/ITransaction';
import { loadState, saveState } from '../../localStorage';
import './Transactions.css';

const Transactions: React.FC = () => {
  const stateId: string = "spendy.transactions";
  const [isLoading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    setLoading(false);

    setTransactions(loadState(stateId) as ITransaction[] || []);
  }, []);

  useEffect(() => saveState(stateId, transactions), [transactions]);

  function updateTransaction(transaction: ITransaction) {
    const index = transactions.findIndex(x => x.id === transaction.id);

    if (index === -1) {
      alert(`Unable to find transaction! Id: ${transaction.id}`);
      return;
    }

    const copyOfTransactions = [...transactions];
    copyOfTransactions[index] = transaction;
    setTransactions(copyOfTransactions);
  }

  function addNewTransaction(transaction: ITransaction) {
    transaction.id = transactions.length;
    setTransactions(transactions.concat(transaction));
    setIsAdding(false);
  }

  function deleteTransaction(id: number) {
    setTransactions(transactions.filter(t => t.id !== id));
  }

  function renderTable(transactions: ITransaction[]): JSX.Element {
    return (
      <table className="transactions">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={5}>
              {isAdding
                ? <>
                    <TransactionForm callback={addNewTransaction}/>
                    <small className="btn" onClick={() => setIsAdding(false)}>Cancel</small>
                  </>
                : <small className="btn" onClick={() => setIsAdding(true)}>Add</small>}
            </td>
          </tr>
          {transactions
            .sort((a, b) => b.dateAdded - a.dateAdded)
            .map(transaction =>
              <TransactionRow transaction={transaction} updateCallback={updateTransaction} deleteCallback={deleteTransaction} />
          )}
          {transactions.length === 0 ? <tr><td colSpan={5}>Nothing to show!</td></tr> : null}
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
