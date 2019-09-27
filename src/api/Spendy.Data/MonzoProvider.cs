namespace Spendy.Data
{
    using Monzo;
    using Spendy.Data.Interfaces;
    using Spendy.Data.Models;
    using System;
    using System.Threading;
    using System.Threading.Tasks;

    public class MonzoProvider : IMonzoProvider
    {
        private readonly MonzoConfig _config = new MonzoConfig();
        private readonly IDataStore _dataStore;
        private readonly MonzoAuthorizationClient _authClient;

        public MonzoProvider(IDataStore dataStore)
        {
            _dataStore = dataStore;
            _authClient = new MonzoAuthorizationClient(_config.MonzoClientId, _config.MonzoClientSecret);
        }

        public async Task<AccessToken> GetAccessToken()
        {
            var token = TryReadExistingToken();

            if (token == null)
            {
                return await SetupNewToken();
            }

            var isValid = await IsValid(token);
            if (!isValid)
            {
                try
                {
                    token = await RefreshToken(token.RefreshToken);
                }
                catch (MonzoException)
                {
                    throw new Exception($"Unable to refresh token. Please delete existing config at: {/*_config.OAuthPath*/ "TODO"}");
                }
            }

            return token;
        }

        private AccessToken TryReadExistingToken()
        {
            return _dataStore.GetMonzoAccessToken();
        }

        private void StoreToken(AccessToken token)
        {
            _dataStore.SaveMonzoAccessToken(token);
        }

        private async Task<AccessToken> SetupNewToken()
        {
            var loginPageUrl = _authClient.GetAuthorizeUrl(null, _config.MonzoRedirectUri);

            Console.WriteLine("Visit the following URL to get the magic code:");
            Console.WriteLine(loginPageUrl);
            Console.WriteLine("Enter magic code:");

            var code = Console.ReadLine();

            var accessToken = await _authClient.GetAccessTokenAsync(code, _config.MonzoRedirectUri);

            StoreToken(accessToken);

            Console.WriteLine($"Successfully created {/*_config.OAuthPath*/ "TODO"}!");

            return accessToken;
        }

        private async Task<bool> IsValid(AccessToken token)
        {
            try
            {
                var whoAmI = await new MonzoClient(token.Value).WhoAmIAsync();
                return whoAmI.Authenticated;
            }
            catch (MonzoException)
            {
                return false;
            }
        }

        private async Task<AccessToken> RefreshToken(string refresh)
        {
            var token = await _authClient.RefreshAccessTokenAsync(refresh, CancellationToken.None);

            StoreToken(token);

            return token;
        }
    }
}
