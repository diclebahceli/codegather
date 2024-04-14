namespace codegather.Application;

public class JudgeResultDto
{
    public string stdout { get; set; } = "";
    public string time { get; set; } = "";
    public int memory { get; set; }
    public string stderr { get; set; } = "";
    public string token { get; set; } = "";

}
