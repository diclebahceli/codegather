using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace codegather.Application;

public class SubmitCommandHandler : BaseHandler, IRequestHandler<SubmitCommandRequest, SubmitCommandResponse>
{
    private ICodeEditorService codeEditorService;
    public SubmitCommandHandler(ICodeEditorService codeEditorService, IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
        this.codeEditorService = codeEditorService;
    }

    public async Task<SubmitCommandResponse> Handle(SubmitCommandRequest request, CancellationToken cancellationToken)
    {
        Question question = await unitOfWork.GetReadRepository<Question>()
           .GetAsync(predicate: x => x.Id == request.QuestionId && !x.IsDeleted
                , include: x => x.Include(x => x.TestCases))
           ?? throw new Exception("Question not found");

        TestCase[] testCase = question.TestCases.ToArray();

        if (testCase.Length == 0)
        {
            throw new Exception("No test cases found");
        }

        float successCount = 0;
        float avgCompileTime = 0;
        float avgMemory = 0;

        foreach (var test in testCase)
        {
            RunSubmissionDto runSubmissionDto = new RunSubmissionDto
            {
                source_code = request.Code,
                language_id = request.LanguageId,
                stdin = test.Input
            };

            RunResultDto result = await codeEditorService.RunCode(runSubmissionDto);

            avgCompileTime += float.Parse(result.time) / testCase.Length;
            avgMemory += result.memory/ testCase.Length;

            if(result.stdout.Trim() == test.Output.Trim())
            {
                successCount += 1/testCase.Length;
            }
        }

        var submission = new Submission{
            QuestionId = request.QuestionId,
            Code = request.Code,
            SuccessRate = successCount,
            CompileTime = avgCompileTime,
            MemoryUsage = avgMemory,
            UserId = request.UserId,
        };

        await unitOfWork.GetWriteRepository<Submission>().AddAsync(submission);
        await unitOfWork.SaveAsync();

        return new SubmitCommandResponse
        {
            Submission =  mapper.Map<SubmissionDto, Submission>(submission)
        };

    }


}
