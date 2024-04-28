using MediatR;
using Microsoft.AspNetCore.Identity;
using codegather.Domain;

namespace codegather.Application;

public class DeleteUserHandler : IRequestHandler<DeleteUserRequest, Unit>
{
    public UserManager<User> userManager;

    public DeleteUserHandler(UserManager<User> userManager)
    {
        this.userManager = userManager;
    }

    public async Task<Unit> Handle(DeleteUserRequest request, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByIdAsync(request.Id.ToString()) ?? throw new Exception("User not found");
        await userManager.DeleteAsync(user);
        return Unit.Value;
    }
}
