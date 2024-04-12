using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace codegather.Application;

public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommandRequest, Unit>
{
    UserManager<User> userManager;

    public UpdateUserCommandHandler(UserManager<User> userManager)
    {
        this.userManager = userManager;
    }

    public async Task<Unit> Handle(UpdateUserCommandRequest request, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByIdAsync(request.Id.ToString()) ?? throw new Exception("User not found");
        user.UserName = request.UserName;
        user.Email = request.Email;
        await userManager.UpdateAsync(user);
        return Unit.Value;
    }
}
