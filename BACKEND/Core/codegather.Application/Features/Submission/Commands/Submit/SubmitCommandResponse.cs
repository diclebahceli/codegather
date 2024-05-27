namespace codegather.Application;

public class SubmitCommandResponse
{
    public SubmissionDto Submission { get; set; }
    public string? Stderr { get; set; }
}
