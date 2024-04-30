using codegather.Domain;
using MediatR;

namespace codegather.Application;

public class CreateTestCaseCommandRequest : IRequest<CreateTestCaseCommandResponse>
{
    public TestCase TestCase { get; set; }
}
