import React, { useState } from 'react';
import Category from '../../interfaces/Category';
import ITransaction from '../../interfaces/ITransaction';
import TransactionForm from './TransactionForm';

interface IProps {
  transaction: ITransaction;
  updateCallback: (transaction: ITransaction) => void;
  deleteCallback: (id: number) => void;
}

const TransactionRow: React.FC<IProps> = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  function handleSubmit(transaction: ITransaction) {
    setIsEditing(false);
    props.updateCallback(transaction);
  }

  function handleDelete(id: number) {
    if (window.confirm("Are you sure you want to delete this transaction")) {
      props.deleteCallback(id);
    }
  }

  function renderRow(transaction: ITransaction): JSX.Element {
    return (
      <tr key={transaction.id}>
        <td>{new Date(transaction.dateAdded).toLocaleDateString()}</td>
        <td>{Category[transaction.category]}</td>
        <td>{transaction.description}</td>
        <td>{transaction.amount}</td>
        <td>
          <small className="btn" onClick={() => setIsEditing(true)}>Edit</small>
          <small className="btn" onClick={() => handleDelete(transaction.id)}>
            Delete
          </small>
        </td>
      </tr>
    );
  }

  return (
    <>
    {isEditing
      ? <tr>
          <td colSpan={5}>
            <TransactionForm callback={handleSubmit} template={props.transaction} />
            <small className="btn" onClick={() => setIsEditing(false)}>Cancel</small>
          </td>
        </tr>
      : renderRow(props.transaction)}
    </>
  );
};

export default TransactionRow;
