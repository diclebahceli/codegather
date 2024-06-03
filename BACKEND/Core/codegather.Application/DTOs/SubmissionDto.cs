namespace codegather.Application;
public class SubmissionDto
{
    public Guid Id { get; set; }
    public Guid QuestionId { get; set; }
    public Guid UserId { get; set; }
    public DateTime SubmissionTime { get; set; } = DateTime.Now;
    public string? Code { get; set; }
    public string SuccessCount { get; set; }
    public float CompileTime { get; set; }
    public float MemoryUsage { get; set; }
    public float Score { get; set; }
    public bool ErrorFree { get; set; }
}
