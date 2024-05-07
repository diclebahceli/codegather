using codegather.Domain;
using MediatR;

namespace codegather.Application;

public class UpdateTestCaseCommandRequest : IRequest<UpdateTestCaseCommandResponse>
{
    public Guid Id { get; set; }
    public string Input { get; set; }
    public string Output { get; set; }
}
