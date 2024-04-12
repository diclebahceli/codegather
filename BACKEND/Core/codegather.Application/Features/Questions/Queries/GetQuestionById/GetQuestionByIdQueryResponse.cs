namespace codegather.Application;
public class GetQuestionByIdQueryResponse
{
    public QuestionDto Question { get; set; }
    public ICollection<SubmissionDto> Submissions { get; set; }
}
