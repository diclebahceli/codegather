using codegather.Domain;

namespace codegather.Application;

public class AuthRules : BaseRules
{

    public Task ValidateUser(User? user)
    {
        if (user is null)
            throw new UserNotFoundException();
        return Task.CompletedTask;

    }
    public Task UserShouldNotExists(User? user)
    {
        if (user is not null)
            throw new UserAlreadyExistsException();
        return Task.CompletedTask;

    }

}