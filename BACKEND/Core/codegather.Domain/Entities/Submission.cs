namespace codegather.Domain;
public class Submission: EntityBase
{
    public Question Question {get; set;}
    public Guid QuestionId {get; set;}
    public User User {get; set;}
    public Guid UserId {get; set;}
    public DateTime SubmissionTime {get; set;} = DateTime.Now;
    public string Code {get; set;}
    public bool IsCorrect {get; set;}
    public Metrics Metrics {get; set;}
    public Guid MetricsId {get; set;}

    public Submission(){ }
    public Submission(Question question, Guid userId, string code, Metrics metrics, bool isCorrect = false){
        Question = question;
        UserId = userId;
        Code = code;
        Metrics = metrics;
    }

}
