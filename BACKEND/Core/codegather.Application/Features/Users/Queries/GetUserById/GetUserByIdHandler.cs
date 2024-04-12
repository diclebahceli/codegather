using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using codegather.Domain;
using codegather.Application;
using codegather.Application.Interfaces.AutoMapper;

namespace socialMedia.Application.Features;
public class GetUserByIdHandler : BaseHandler, IRequestHandler<GetUserByIdRequest, GetUserByIdResponse>
{

    UserManager<User> userManager;

    public GetUserByIdHandler(UserManager<User> userManager, IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
        this.userManager = userManager;
    }


    public async Task<GetUserByIdResponse> Handle(GetUserByIdRequest request, CancellationToken cancellationToken)
    {
        User user = await userManager.FindByIdAsync(request.Id) ?? throw new Exception("User not found");

        return new GetUserByIdResponse
        {
            User = mapper.Map<UserDto, User>(user)
        };

    }
}
