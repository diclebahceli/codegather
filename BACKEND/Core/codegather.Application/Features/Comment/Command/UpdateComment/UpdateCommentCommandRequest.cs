using MediatR;

namespace codegather.Application;
public class UpdateCommentCommandRequest: IRequest<Unit>
{
    public Guid Id { get; set; }
    public string Content { get; set; }
    
}
