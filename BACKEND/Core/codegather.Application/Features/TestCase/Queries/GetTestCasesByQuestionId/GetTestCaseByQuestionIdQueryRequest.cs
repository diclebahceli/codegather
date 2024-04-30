using MediatR;

namespace codegather.Application;

public class GetTestCaseByQuestionIdQueryRequest : IRequest<GetTestCaseByQuestionIdQueryResponse>
{
    public Guid QuestionId { get; set; }
}
