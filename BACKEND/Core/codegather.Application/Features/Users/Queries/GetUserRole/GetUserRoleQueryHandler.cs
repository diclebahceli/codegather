using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace codegather.Application;

public class GetUserRoleQueryHandler : BaseHandler, IRequestHandler<GetUserRoleQueryRequest, GetUserRoleQueryResponse>
{
    UserManager<User> userManager;
    public GetUserRoleQueryHandler(UserManager<User> userManager, IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
        this.userManager = userManager;
    }

    public async Task<GetUserRoleQueryResponse> Handle(GetUserRoleQueryRequest request, CancellationToken cancellationToken)
    {

        var user = userManager.FindByIdAsync(request.UserId.ToString()).Result;
        var roles = userManager.GetRolesAsync(user).Result;
        var asign = new GetUserRoleQueryResponse
        {
            Roles = roles
        };

        return asign;
    }
}
