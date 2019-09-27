namespace Spendy.Data
{
    using Monzo;
    using Spendy.Data.Interfaces;

    class LiteDBDataStore : IDataStore
    {
        private static readonly string Path = "Spendy-LiteDB.db";

        public AccessToken GetMonzoAccessToken()
        {
            throw new System.NotImplementedException();
        }

        public void SaveMonzoAccessToken(AccessToken token)
        {
            throw new System.NotImplementedException();
        }
    }
}
