using MediatR;

namespace codegather.Application;

public class GetSubmissionByIdQueryRequest : IRequest<GetSubmissionByIdQueryResponse>
{
    public Guid SubmissionId { get; set; }
}
