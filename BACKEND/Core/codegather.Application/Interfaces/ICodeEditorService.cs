namespace codegather.Application;

public interface ICodeEditorService
{
    Task<RunResultDto> RunCode(RunSubmissionDto runSubmissionDto);
    Task<RunResultDto> GetResult(string token);
}
