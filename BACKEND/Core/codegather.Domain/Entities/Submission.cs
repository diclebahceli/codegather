namespace codegather.Domain;
public class Submission : EntityBase
{
    public Question Question { get; set; }
    public Guid QuestionId { get; set; }
    public User User { get; set; }
    public Guid UserId { get; set; }
    public DateTime SubmissionTime { get; set; } = DateTime.Now;
    public string Code { get; set; }
    public float SuccessRate { get; set; }
    public float CompileTime { get; set; }
    public float MemoryUsage { get; set; }
    public float Score { get; set; }


    public Submission() { }
    public Submission(Question question, Guid userId, string code, bool isCorrect = false)
    {
        Question = question;
        UserId = userId;
    }

}
