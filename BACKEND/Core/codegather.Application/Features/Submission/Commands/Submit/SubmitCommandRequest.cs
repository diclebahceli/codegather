using MediatR;

namespace codegather.Application;

public class SubmitCommandRequest : IRequest<SubmitCommandResponse>
{
    public Guid UserId { get; set; }
    public Guid QuestionId { get; set; }
    public string Code { get; set; }
    public int LanguageId { get; set; }
}
