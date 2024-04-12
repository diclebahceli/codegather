using MediatR;

namespace codegather.Application;
public class LogoutCommandRequest : IRequest<Unit>
{
    public string Email { get; set; }
}
