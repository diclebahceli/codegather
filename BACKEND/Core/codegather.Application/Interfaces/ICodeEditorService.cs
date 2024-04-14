namespace codegather.Application;

public interface ICodeEditorService
{
    Task<JudgeResultDto> CreateSubmission(JudgeSubmissionDto content);
    Task<JudgeResultDto> GetResult(string token);
}
