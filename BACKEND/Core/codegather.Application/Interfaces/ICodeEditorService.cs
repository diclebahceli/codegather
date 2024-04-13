namespace codegather.Application;

public interface ICodeEditorService
{
    Task CreateSubmission(JudgeSubmissionDto content);
    Task<JudgeResultDto> GetResult(string token);
}
