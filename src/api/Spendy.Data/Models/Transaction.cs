namespace Spendy.Data.Models
{
    using System;

    public class Transaction
    {
        public int Id { get; set; }
        public Category Category { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }
    }
}
