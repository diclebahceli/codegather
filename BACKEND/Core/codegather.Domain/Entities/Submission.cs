namespace codegather.Domain;
public class Submission: EntityBase
{
    public Question Question {get; set;}
    public int QuestionId {get; set;}
    public User User {get; set;}
    public int UserId {get; set;}
    public DateTime SubmissionTime {get; set;} = DateTime.Now;
    public string Code {get; set;}
    public Metrics Metrics {get; set;}

    public Submission(){ }
    public Submission(Question question, User user, string code, Metrics metrics){
        Question = question;
        User = user;
        Code = code;
        Metrics = metrics;
    }

}
