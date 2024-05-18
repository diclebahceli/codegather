namespace codegather.Application;

public interface ICodeEditorService
{
    Task<RunResultDto> RunCode(RunSubmissionDto runSubmissionDto);
    Task<List<RunResultDto>> RunCode(List<RunSubmissionDto> runSubmissionDtos);
    Task<RunResultDto> GetResult(string token);
}
