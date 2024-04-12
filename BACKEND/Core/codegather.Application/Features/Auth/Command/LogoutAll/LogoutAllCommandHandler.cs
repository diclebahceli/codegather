using codegather.Application;
using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace codegather.Application;
public class LogoutAllCommandHandler : BaseHandler, IRequestHandler<LogoutAllCommandRequest, Unit>
{
    private AuthRules authRules;
    private UserManager<User> userManager;

    public LogoutAllCommandHandler(AuthRules authRules, UserManager<User> userManager, IMapper mapper, IUnitOfWork repositoryGetter, IHttpContextAccessor
     httpContextAccessor) : base(mapper, repositoryGetter, httpContextAccessor)
    {
        this.authRules = authRules;
        this.userManager = userManager;
    }

    public async Task<Unit> Handle(LogoutAllCommandRequest request, CancellationToken cancellationToken)
    {
        List<User> users = userManager.Users.ToList();
        users.ForEach(async user =>
        {
            user.RefreshToken = null;
            user.RefreshTokenExpiryTime = null;
            await userManager.UpdateAsync(user);
        });

        return Unit.Value;
    }
}
