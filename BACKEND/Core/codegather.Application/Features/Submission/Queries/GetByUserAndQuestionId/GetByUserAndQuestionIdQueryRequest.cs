using MediatR;

namespace codegather.Application;

public class GetByUserAndQuestionIdQueryRequest: IRequest<GetByUserAndQuestionIdQueryResponse>
{
    public Guid UserId { get; set; }
    public Guid QuestionId { get; set; }
}

