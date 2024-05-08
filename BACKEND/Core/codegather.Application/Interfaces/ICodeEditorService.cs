namespace codegather.Application;

public interface ICodeEditorService
{
    Task<RunResultDto> CreateSubmission(JudgeSubmissionDto content);
    Task<RunResultDto> GetResult(string token);
}
