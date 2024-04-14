using MediatR;

namespace codegather.Application;

public class GetResultByTokenQueryRequest : IRequest<GetResultByTokenQueryResponse>
{
    public string Token { get; set; }
}
