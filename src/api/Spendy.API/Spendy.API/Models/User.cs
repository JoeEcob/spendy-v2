namespace Spendy.API.Models
{
    using MongoDB.Bson;
    using MongoDB.Bson.Serialization.Attributes;
    using System.Collections.Generic;

    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public Reminders Reminders { get; set; }

        public Dictionary<string, string[]> FitPlanFood { get; set; }

        public Dictionary<string, string[]> FitPlanFitness { get; set; }
    }
}
