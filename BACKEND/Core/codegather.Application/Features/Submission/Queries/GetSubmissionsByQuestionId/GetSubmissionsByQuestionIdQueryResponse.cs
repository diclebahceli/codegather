using codegather.Domain;

namespace codegather.Application;

public class GetSubmissionsByQuestionIdQueryResponse
{
    public ICollection<SubmissionDto> Submissions { get; set; }
}
