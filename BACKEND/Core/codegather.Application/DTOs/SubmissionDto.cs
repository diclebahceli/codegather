using codegather.Domain;

namespace codegather.Application;
public class SubmissionDto
{
    public int Id  {get; set;}
    public int QuestionId {get; set;}
    public Guid UserId {get; set;}
    public DateTime SubmissionTime {get; set;} = DateTime.Now;
    public string Code {get; set;}
    public bool IsCorrect {get; set;}
    public int MetricsId {get; set;}

}
