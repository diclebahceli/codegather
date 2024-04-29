using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace codegather.Application;

public class GetAllRolesQueryHandler : BaseHandler, IRequestHandler<GetAllRolesQueryRequest, GetAllRolesQueryResponse >
{
    RoleManager<Role> roleManager;

    public GetAllRolesQueryHandler(RoleManager<Role> roleManager, IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
        this.roleManager = roleManager;
    }


    public Task<GetAllRolesQueryResponse> Handle(GetAllRolesQueryRequest request, CancellationToken cancellationToken)
    {
        List<string> roles = roleManager.Roles.Select(x => x.Name).ToList();
        var asign = new GetAllRolesQueryResponse
        {
            Roles = roles

        };

        return Task.FromResult(asign);
    }
}
