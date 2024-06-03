using System.Security.Cryptography.X509Certificates;
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
        float calculateScore(float time, float memory)
        {
            float timeValue = 1 / time;
            float memoryValue = 1 / memory;

            float finalScore = 2 * (timeValue + memoryValue);

            return finalScore;


        };

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
        float maxCompileTime = 0;
        float maxMemory = 0;


        List<RunSubmissionDto> runSubmissionDtos = new List<RunSubmissionDto>();

        foreach (var test in testCase)
        {
            RunSubmissionDto runSubmissionDto = new RunSubmissionDto
            {
                source_code = request.Code,
                language_id = request.LanguageId,
                stdin = test.Input
            };

            runSubmissionDtos.Add(runSubmissionDto);

        }

        List<RunResultDto> result = await codeEditorService.RunCode(runSubmissionDtos);

        int i = 0;
        string errMessage = "";
        foreach (var res in result)
        {
            if (res.stderr != null && res.stderr.Trim() != "")
            {
                errMessage = res.stderr;
                break;
            }
            if (res.stdout?.Trim() == testCase[i].Output.Trim())
            {
                successCount += 1;
            }
            if (float.Parse(res.time) > maxCompileTime)
            {
                maxCompileTime = float.Parse(res.time);
            }
            if (float.Parse(res.memory) > maxMemory)
            {
                maxMemory = float.Parse(res.memory);
            }
            avgCompileTime += float.Parse(res.time) / testCase.Length;
            avgMemory += float.Parse(res.memory) / testCase.Length;
            i++;
        }

        float score = calculateScore(avgCompileTime, avgMemory);

        if (successCount < 1)
            score = 0;


        var submission = new Submission
        {
            QuestionId = request.QuestionId,
            Code = request.Code,
            SuccessCount = successCount + "/" + testCase.Length,
            CompileTime = avgCompileTime,
            MemoryUsage = avgMemory,
            UserId = request.UserId,
            Score = errMessage == "" ? score : 0,
            ErrorFree = errMessage == "" ? true : false
        };

        await unitOfWork.GetWriteRepository<Submission>().AddAsync(submission);
        await unitOfWork.SaveAsync();

        return new SubmitCommandResponse
        {
            Submission = mapper.Map<SubmissionDto, Submission>(submission),
            Stderr = errMessage
        };

    }


}
