import Category from './Category';

interface Transaction {
  id: number;
  category: Category;
  description: string;
  amount: number;
  dateCreated: Date;
  dateUpdated: Date;
}

export default Transaction;
