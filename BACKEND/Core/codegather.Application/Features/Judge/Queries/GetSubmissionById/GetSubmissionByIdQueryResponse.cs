using codegather.Domain;
using MediatR;

namespace codegather.Application;

public class GetSubmissionByIdQueryResponse {
    public Submission Submission { get; set; }
}
