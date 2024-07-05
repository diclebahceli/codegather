using MediatR;

namespace codegather.Application;
public class CreateCommentCommandRequest: IRequest<Unit>
{
    public Guid UserId { get; set; }
    public Guid QuestionId { get; set; }
    public string Content { get; set; }
    
}
