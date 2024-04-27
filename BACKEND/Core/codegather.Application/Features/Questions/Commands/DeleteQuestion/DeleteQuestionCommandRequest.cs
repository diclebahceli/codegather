using MediatR;

namespace codegather.Application;
public class DeleteQuestionCommandRequest: IRequest<Unit>
{
    public Guid Id { get; set; }
}
