using MediatR;

namespace codegather.Application;
public class DeleteQuestionCommandRequest: IRequest<Unit>
{
    public int Id { get; set; }
}
