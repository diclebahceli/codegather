using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using codegather.Domain;
using codegather.Application.Interfaces.AutoMapper;

namespace codegather.Application;
public class GetAllUsersHandler : BaseHandler, IRequestHandler<GetAllUsersRequest, GetAllUsersResponse>
{
    UserManager<User> userManager;

    public GetAllUsersHandler(UserManager<User> userManager, IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
        this.userManager = userManager;
    }


    public Task<GetAllUsersResponse> Handle(GetAllUsersRequest request, CancellationToken cancellationToken)
    {
        var users = new GetAllUsersResponse()
        {
            Users = userManager.Users.ToList().Select(x => mapper.Map<UserDto, User>(x)).ToList()
        };
        return Task.FromResult(users);
    }
}
