using MediatR;

namespace codegather.Application
{
    public class GetLastSubmissionQueryRequest: IRequest<GetLastSubmissionQueryResponse>
    {
        public Guid UserId { get; set; }
        public Guid QuestionId { get; set; }
    }
}
