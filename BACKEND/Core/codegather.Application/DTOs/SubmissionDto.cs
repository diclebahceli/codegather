namespace codegather.Application;
public class SubmissionDto
{
    public Guid Id  {get; set;}
    public Guid QuestionId {get; set;}
    public Guid UserId {get; set;}
    public DateTime SubmissionTime {get; set;} = DateTime.Now;
    public string? Code {get; set;}
    public float SuccessRate {get; set;}
}
