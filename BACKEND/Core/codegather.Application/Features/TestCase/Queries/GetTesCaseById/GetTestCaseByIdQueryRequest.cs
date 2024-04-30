using MediatR;

namespace codegather.Application;

public class GetTestCaseByIdQueryRequest : IRequest<GetTestCaseByIdQueryResponse>
{
    public Guid Id { get; set; }
}
