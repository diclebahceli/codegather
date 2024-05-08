using codegather.Domain;
using MediatR;

namespace codegather.Application;

public class GetSubmissionByIdQueryResponse
{
    public SubmissionDto Submission { get; set; }
}
