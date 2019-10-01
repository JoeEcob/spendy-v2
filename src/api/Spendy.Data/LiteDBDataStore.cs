namespace Spendy.Data
{
    using System.Collections.Generic;
    using LiteDB;
    using Spendy.Data.Interfaces;
    using Spendy.Data.Models;

    public class LiteDBDataStore : IDataStore
    {
        private static readonly string Path = @"AppData/Spendy-LiteDB.db";

        public IEnumerable<Transaction> GetTransactions()
        {
            using (var db = new LiteDatabase(Path))
            {
                return db.GetCollection<Transaction>("transactions").FindAll();
            }
        }

        public Transaction AddTransaction(Transaction transaction)
        {
            using (var db = new LiteDatabase(Path))
            {
                var transactions = db.GetCollection<Transaction>("transactions"); // TODO - move to const model

                transactions.Insert(transaction);

                transactions.EnsureIndex(x => x.Id);
            }

            return transaction;
        }
    }
}
