using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using codegather.Domain;

namespace codegather.Application;

public interface ITokenService
{
    Task<JwtSecurityToken> CreateToken(User user, IList<string> roles);

    string GenerateRefreshToken();

    ClaimsPrincipal? GetPrincipalFromExpiredToken();
}
