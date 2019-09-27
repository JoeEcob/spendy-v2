namespace Spendy.Data.Interfaces
{
    using System.Threading.Tasks;
    using Monzo;

    public interface IMonzoProvider
    {
        Task<AccessToken> GetAccessToken();
    }
}