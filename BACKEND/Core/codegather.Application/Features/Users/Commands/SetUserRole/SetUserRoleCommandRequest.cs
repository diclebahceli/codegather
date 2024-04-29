using MediatR;

namespace codegather.Application;

public class SetUserRoleCommandRequest : IRequest<Unit>
{
    public Guid UserId { get; set; }
    public ICollection<string> Roles { get; set; }

}
