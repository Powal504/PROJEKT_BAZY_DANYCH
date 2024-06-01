using System.Linq;
using System.Security.Claims;

namespace api.Extensions
{
    public static class ClaimsExtensions
    {
        public static string GetUsername(this ClaimsPrincipal user)
        {
            Console.WriteLine("User object: " + user);

            var claim = user?.Claims?.SingleOrDefault(x => x.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname");

            if (claim != null)
            {
                Console.WriteLine("Claim value: " + claim.Value);
                return claim.Value;
            }
            else
            {
                Console.WriteLine("Claim not found.");
                return null;
            }
        }
    }
}
