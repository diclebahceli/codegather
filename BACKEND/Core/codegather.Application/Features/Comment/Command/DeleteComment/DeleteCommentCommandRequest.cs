using MediatR;

namespace codegather.Application;
public class DeleteCommentCommandRequest: IRequest<Unit>
{
    public Guid Id { get; set; }
}
