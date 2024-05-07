using codegather.Domain;

namespace codegather.Application;

public class GetAllSubmissionsQueryResponse
{
    public ICollection<SubmissionDto> Submissions { get; set; }
}
