using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace codegather.Application;
public class LogoutCommandHandler : BaseHandler, IRequestHandler<LogoutCommandRequest, Unit>
{
    private AuthRules authRules;
    private UserManager<User> userManager;
    public LogoutCommandHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor, AuthRules authRules, UserManager<User> userManager) : base(mapper, unitOfWork, httpContextAccessor)
    {
        this.authRules = authRules;
        this.userManager = userManager;
    }

    public async Task<Unit> Handle(LogoutCommandRequest request, CancellationToken cancellationToken)
    {
        User user = userManager.FindByEmailAsync(request.Email).Result;
        await authRules.ValidateUser(user);

        user.RefreshToken = null;
        user.RefreshTokenExpiryTime = null;
        await userManager.UpdateAsync(user);
        return Unit.Value;
    }
}
