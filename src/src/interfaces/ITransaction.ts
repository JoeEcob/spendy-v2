import Category from './Category';

interface ITransaction {
  id: number;
  dateAdded: number;
  category: Category;
  description: string;
  amount: number;
}

export default ITransaction;
