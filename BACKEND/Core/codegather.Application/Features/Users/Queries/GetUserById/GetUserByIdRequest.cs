using MediatR;

namespace codegather.Application;
public class GetUserByIdRequest : IRequest<GetUserByIdResponse>
{
    public string Id { get; set; }

}
