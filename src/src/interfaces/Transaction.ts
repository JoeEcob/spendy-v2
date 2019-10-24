import Category from './Category';

interface Transaction {
  id: number;
  category: Category;
  description: string;
  amount: number;
  dateCreated: number;
  dateUpdated: number;
}

export default Transaction;
