namespace Spendy.Data.Interfaces
{
    using Monzo;

    public interface IDataStore
    {
        AccessToken GetMonzoAccessToken();
        void SaveMonzoAccessToken(AccessToken token);
    }
}
