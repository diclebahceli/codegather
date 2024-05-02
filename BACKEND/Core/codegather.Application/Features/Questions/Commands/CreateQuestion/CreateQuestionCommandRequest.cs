using MediatR;

namespace codegather.Application;
public class CreateQuestionCommandRequest : IRequest<CreateQuestionCommandResponse>
{
    public Guid CompetitionId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string StarterCode { get; set; }
}
