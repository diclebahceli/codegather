using codegather.Domain;

namespace codegather.Application;

public class GetSubmissionsByQuestionIdQueryResponse
{
    public ICollection<Submission> Submissions { get; set; }
}
