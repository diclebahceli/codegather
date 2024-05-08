using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace codegather.Application;

public class UpdateTestCaseCommandHandler : BaseHandler, IRequestHandler<UpdateTestCaseCommandRequest, UpdateTestCaseCommandResponse>
{
    private readonly TestCaseRules testCaseRules;

    public UpdateTestCaseCommandHandler(TestCaseRules testCaseRules, IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
        this.testCaseRules = testCaseRules;
    }

    public async Task<UpdateTestCaseCommandResponse> Handle(UpdateTestCaseCommandRequest request, CancellationToken cancellationToken)
    {
        var testCase = await unitOfWork.GetReadRepository<TestCase>()
            .GetAsync(predicate: q => q.Id == request.Id && q.IsDeleted == false
                    , include: q => q.Include(q => q.Question)) 
            ?? throw new Exception("No such test case found");
        
        var competition = await unitOfWork.GetReadRepository<Competition>()
            .GetAsync(predicate: c => c.Id == testCase.Question.CompetitionId && c.IsDeleted == false)
            ?? throw new Exception("No such competition found");

        await testCaseRules.CannotEditTestCaseAfterMadePublic(competition);

        testCase.Input = request.Input;
        testCase.Output = request.Output;

        await unitOfWork.GetWriteRepository<TestCase>().UpdateAsync(testCase);
        await unitOfWork.SaveAsync();

        return new UpdateTestCaseCommandResponse
        {
            TestCase = mapper.Map<TestCaseDto, TestCase>(testCase)
        };
    }
}
