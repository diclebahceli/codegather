using codegather.Domain;
using MediatR;

namespace codegather.Application;

public class UpdateTestCaseCommandRequest : IRequest<UpdateTestCaseCommandResponse>
{
    public TestCaseDto TestCase { get; set; }
}
