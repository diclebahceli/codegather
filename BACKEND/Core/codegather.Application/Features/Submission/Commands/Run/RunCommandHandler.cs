using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace codegather.Application;

public class RunCommandHandler : BaseHandler, IRequestHandler<RunCommandRequest, RunCommandResponse>
{

    private readonly ICodeEditorService codeEditorService;

    public RunCommandHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor, ICodeEditorService codeEditorService) : base(mapper, unitOfWork, httpContextAccessor)
    {
        this.codeEditorService = codeEditorService;
    }

    public async Task<RunCommandResponse> Handle(RunCommandRequest request, CancellationToken cancellationToken)
    {
        Question question = await unitOfWork.GetReadRepository<Question>()
           .GetAsync(predicate: x => x.Id == request.QuestionId && !x.IsDeleted
                , include: x => x.Include(x => x.TestCases))
           ?? throw new Exception("Question not found");

        if (question.TestCases.Count == 0)
            throw new Exception("No test cases found");

        TestCase testCase = question.TestCases.ToArray()[0];

        RunSubmissionDto runSubmissionDto = new RunSubmissionDto
        {
            source_code = request.Code,
            language_id = request.LanguageId,
            stdin = testCase.Input
        };

        RunResultDto result = await codeEditorService.RunCode(runSubmissionDto);

        return new RunCommandResponse
        {
            RunResult = result
        };
    }
}
