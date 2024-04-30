using MediatR;

namespace codegather.Application;

public class DeleteTestCaseCommandRequest : IRequest<Unit>
{
    public Guid TestCaseId { get; set; }
}
