using MediatR;

namespace codegather.Application;

public class RegisterCommandRequest : IRequest<Unit>
{
    public string UserName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }

}
