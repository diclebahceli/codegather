using MediatR;

namespace codegather.Application;

public class GetUserRoleQueryRequest : IRequest<GetUserRoleQueryResponse>
{
    public Guid UserId { get; set; }
}
