using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace codegather.Application;

public class SetUserRoleCommandHandler : BaseHandler, IRequestHandler<SetUserRoleCommandRequest, Unit>
{
    private readonly UserManager<User> userManager;

    public SetUserRoleCommandHandler(UserManager<User> userManager, IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
        this.userManager = userManager;
    }

    public async Task<Unit> Handle(SetUserRoleCommandRequest request, CancellationToken cancellationToken)
    {
        var user = userManager.FindByIdAsync(request.UserId.ToString()).Result;
        if (user == null)
            throw new Exception("User not found");

        if(request.Roles == null || request.Roles.Count == 0)
            throw new Exception("User should have at least one role");

        var roles = userManager.GetRolesAsync(user).Result;
        foreach (var role in request.Roles)
        {
            if (!roles.Contains(role))
                await userManager.AddToRoleAsync(user, role);
        }

        foreach (var role in roles)
        {
            if (!request.Roles.Contains(role))
                await userManager.RemoveFromRoleAsync(user, role);
        }


        return Unit.Value;
    }
}
