using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace codegather.Application;
public class RefreshTokenCommandHandler : BaseHandler, IRequestHandler<RefreshTokenCommandRequest, RefreshTokenCommandResponse>
{
    private UserManager<User> userManager;
    private ITokenService jwtService;
    public RefreshTokenCommandHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor, ITokenService jwtService, UserManager<User> userManager) : base(mapper, unitOfWork, httpContextAccessor)
    {
        this.jwtService = jwtService;
        this.userManager = userManager;
    }

    public async Task<RefreshTokenCommandResponse> Handle(RefreshTokenCommandRequest request, CancellationToken cancellationToken)
    {
        var principal = jwtService.GetPrincipalFromExpiredToken(request.AccessToken);
        var email = principal.FindFirstValue(ClaimTypes.Email);

        var user = await userManager.FindByEmailAsync(email);
        var roles = await userManager.GetRolesAsync(user);

        if (user.RefreshTokenExpiryTime < DateTime.Now)
        {
            throw new Exception("Refresh token has expired");
        }

        JwtSecurityToken newAccessToken = await jwtService.CreateToken(user, roles);
        var newRefreshToken = jwtService.GenerateRefreshToken();

        user.RefreshToken = newRefreshToken;
        await userManager.UpdateAsync(user);

        return new()
        {
            AccessToken = new JwtSecurityTokenHandler().WriteToken(newAccessToken),
            RefreshToken = newRefreshToken
        };
    }
}
