using MediatR;

namespace codegather.Application;
public class CreateQuestionCommandRequest: IRequest<CreateQuestionCommandResponse>
{
    public int CompetitionId { get; set; }
    public string Description { get; set; }
}
