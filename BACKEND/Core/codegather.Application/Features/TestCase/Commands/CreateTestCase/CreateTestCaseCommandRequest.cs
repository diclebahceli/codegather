using codegather.Domain;
using MediatR;

namespace codegather.Application;

public class CreateTestCaseCommandRequest : IRequest<CreateTestCaseCommandResponse>
{
    public Guid QuestionId { get; set; }
    public string Input { get; set; }
    public string Output { get; set; }
}
