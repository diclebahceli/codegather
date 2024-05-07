using codegather.Domain;

namespace codegather.Application;

public class GetAllSubmissionsQueryResponse
{
    public ICollection<Submission> Submissions { get; set; }
}
