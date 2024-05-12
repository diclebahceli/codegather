using MediatR;

namespace codegather.Application;

public class RunCommandRequest: IRequest<RunCommandResponse>
{
    public Guid UserId { get; set; }
    public Guid QuestionId { get; set; }
    public string Code { get; set; }
    public int LanguageId { get; set; }
}
