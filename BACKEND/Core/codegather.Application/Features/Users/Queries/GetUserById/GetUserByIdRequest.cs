using MediatR;

namespace codegather.Application;
public class GetUserByIdRequest : IRequest<GetUserByIdResponse>
{
    public Guid Id { get; set; }

}
