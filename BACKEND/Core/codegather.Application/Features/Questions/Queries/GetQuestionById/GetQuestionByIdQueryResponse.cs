using codegather.Domain;

namespace codegather.Application;
public class GetQuestionByIdQueryResponse
{
    public QuestionDto Question { get; set; }
    public ICollection<SubmissionDto> Submissions { get; set; } = new List<SubmissionDto>();
    public ICollection<TestCaseDto> TestCases { get; set; } = new List<TestCaseDto>();
    public ICollection<CommentDto> Comments { get; set; } = new List<CommentDto>();
}
