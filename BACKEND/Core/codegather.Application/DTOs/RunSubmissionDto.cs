namespace codegather.Application;

public class RunSubmissionDto
{
    public string source_code { get; set; } = "";
    public int language_id { get; set; }
    public string stdin { get; set; } = "";
}
