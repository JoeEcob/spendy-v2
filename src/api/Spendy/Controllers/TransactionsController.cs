namespace Spendy.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using Spendy.Data.Interfaces;
    using Spendy.Data.Models;
    using System;
    using System.Collections.Generic;

    [ApiController]
    [Route("[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly IDataStore _dataStore;
        private readonly ILogger<TransactionsController> _logger;

        public TransactionsController(ILogger<TransactionsController> logger, IDataStore dataStore)
        {
            _dataStore = dataStore;
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Transaction> Get()
        {
            return _dataStore.GetTransactions();
        }

        [HttpPost]
        public Transaction Add(Transaction transaction)
        {
            transaction.DateCreated = DateTime.UtcNow;
            transaction.DateUpdated = DateTime.UtcNow;

            return _dataStore.AddTransaction(transaction);
        }
    }
}
