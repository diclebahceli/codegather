
namespace codegather.Application;

public class DetailedQuestionDto
{
    public Guid CompetitionId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string StarterCode { get; set; }
    public ICollection<TestCaseDto> TestCases { get; set; } = new List<TestCaseDto>();
    public ICollection<SubmissionDto> Submissions { get; set; } = new List<SubmissionDto>();
}

