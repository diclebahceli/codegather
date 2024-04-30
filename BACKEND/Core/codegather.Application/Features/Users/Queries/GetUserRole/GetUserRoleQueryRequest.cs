using MediatR;

namespace codegather.Application;

public class GetUserRoleQueryRequest : IRequest<GetUserRoleQueryResponse>
{
    public string UserId { get; set; }
}
