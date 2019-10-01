namespace Spendy.Data.Interfaces
{
    using System.Collections.Generic;
    using Spendy.Data.Models;

    public interface IDataStore
    {
        IEnumerable<Transaction> GetTransactions();
        Transaction AddTransaction(Transaction transaction);
    }
}
