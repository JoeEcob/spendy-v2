import React, { useState, useEffect } from 'react';
import Category from '../../interfaces/Category';
import ITransaction from '../../interfaces/ITransaction';

interface IState {
  id: number,
  dateAdded: number,
  category: number,
  description: string,
  amount: number
}

interface IProps {
  callback: (transaction: ITransaction) => void;
  template?: ITransaction;
}

const TransactionForm: React.FC<IProps> = (props) => {
  const [id, setId] = useState(0);
  const [dateAdded, setDateAdded] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (!props.template) {
      return;
    }

    setId(props.template.id);
    setDateAdded(new Date(props.template.dateAdded).toLocaleDateString());
    setCategory(Category[props.template.category]);
    setDescription(props.template.description);
    setAmount(props.template.amount.toString());

  }, [props.template]);

  function handleSubmit(e: React.FormEvent<HTMLElement>) {
      e.preventDefault();

      const transaction: ITransaction = {
        id: props.template ? props.template.id : 0, // Will be replaced in the caller since that has access to list size
        dateAdded: Date.parse(dateAdded) || Date.now(),
        category: Category[category as keyof typeof Category] || Category.None,
        description: description,
        amount: Number(amount) || 0
      };

      // Todo - validate

      props.callback(transaction);
  }

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <input type="hidden" value={id} />
      <input type="text" value={dateAdded} onChange={e => setDateAdded(e.target.value) } placeholder="DD/MM/YYYY" />
      <select value={category} onChange={e => setCategory(e.target.value) }>
        {Object.keys(Category)
          .filter(x => isNaN(Number(x))).map((value) => <option value={value}>{value}</option>)}
      </select>
      <input type="text" value={description} onChange={e => setDescription(e.target.value) } placeholder="Description..." />
      <input type="text" value={amount} onChange={e => setAmount(e.target.value) } placeholder="Amount..." />
      <input type="submit" className="btn" value="Save" />
    </form>
  );
}

export default TransactionForm;
