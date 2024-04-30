using codegather.Domain;
using MediatR;

namespace codegather.Application;

public class UpdateTestCaseCommandRequest : IRequest<UpdateTestCaseCommandResponse>
{
    public TestCase TestCase { get; set; }
}
