using System.IdentityModel.Tokens.Jwt;
using codegather.Application;
using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace Namespace;
public class LoginCommandHandler : BaseHandler, IRequestHandler<LoginCommandRequest, LoginCommandResponse>
{
    private readonly UserManager<User> userManager;
    private readonly AuthRules authRules;
    private readonly IConfiguration configuration;
    private readonly ITokenService jwtService;
    public LoginCommandHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor, UserManager<User> userManager, AuthRules authRules, IConfiguration configuration, ITokenService jwtService) : base(mapper, unitOfWork, httpContextAccessor)
    {
        this.userManager = userManager;
        this.authRules = authRules;
        this.configuration = configuration;
        this.jwtService = jwtService;
    }

    public async Task<LoginCommandResponse> Handle(LoginCommandRequest request, CancellationToken cancellationToken)
    {
        var user = userManager.FindByEmailAsync(request.Email).Result;

        await authRules.ValidateUser(user);

        bool isPasswordValid = await userManager.CheckPasswordAsync(user, request.Password);

        if (!isPasswordValid)
            throw new InvalidPasswordOrEmailExcception();

        IList<string> list = await userManager.GetRolesAsync(user);

        JwtSecurityToken jwtSecurityToken = await jwtService.CreateToken(user, list);
        string refreshToken = jwtService.GenerateRefreshToken();

        _ = int.TryParse(configuration["JWT:RefreshExpirationInDays"], out int refreshTokenExpiration);
        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiryTime = DateTime.Now.AddDays(refreshTokenExpiration);

        await userManager.UpdateAsync(user);
        await userManager.UpdateSecurityStampAsync(user);

        string tokenStr = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);

        await userManager.SetAuthenticationTokenAsync(user, "Default", "AccessToken", tokenStr);

        return new LoginCommandResponse()
        {
            AccessToken = tokenStr,
            RefreshToken = refreshToken,
            Expires = jwtSecurityToken.ValidTo
        };
    }
}
