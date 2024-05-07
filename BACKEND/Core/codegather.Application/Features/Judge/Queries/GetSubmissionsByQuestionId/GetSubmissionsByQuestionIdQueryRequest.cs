using MediatR;

namespace codegather.Application;

public class GetSubmissionsByQuestionIdQueryRequest : IRequest<GetSubmissionsByQuestionIdQueryResponse>
{
    public Guid QuestionId { get; set; }
}
