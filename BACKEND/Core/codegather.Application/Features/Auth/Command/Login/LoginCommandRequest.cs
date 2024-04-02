using MediatR;

namespace codegather.Application;
public class LoginCommandRequest : IRequest<LoginCommandResponse>
{
    public string Email { get; set; }
    public string Password { get; set; }
}
