namespace Spendy.API.Services
{
    using MongoDB.Driver;
    using Spendy.API.Models;
    using System.Threading.Tasks;

    public class UserService
    {
        private readonly IMongoCollection<User> _users;

        public UserService(SpendyDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<User>(settings.UsersCollectionName);
        }

        public async Task<User> Get(string id) => (await _users.FindAsync(user => user.Id == id)).FirstOrDefault();

        public async Task<User> Create(User user)
        {
            await _users.InsertOneAsync(user);
            return user;
        }

        public async Task Update(string id, User user) => await _users.ReplaceOneAsync(user => user.Id == id, user);
    }
}
