using MediatR;

namespace codegather.Application;

public class GetSubmissionByIdQueryRequest : IRequest<GetSubmissionByIdQueryResponse>
{
    public string SubmissionId { get; set; }
}
