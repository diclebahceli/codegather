using MediatR;

namespace codegather.Application;

public class DeleteUserRequest : IRequest<Unit>
{
    public Guid Id { get; set; }

}
