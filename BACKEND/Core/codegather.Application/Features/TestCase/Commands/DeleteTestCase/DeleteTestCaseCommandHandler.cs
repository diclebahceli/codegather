using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace codegather.Application;

public class DeleteTestCaseCommandHandler : BaseHandler, IRequestHandler<DeleteTestCaseCommandRequest, Unit>
{
    private readonly TestCaseRules testCaseRules;

    public DeleteTestCaseCommandHandler(TestCaseRules testCaseRules, IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
        this.testCaseRules = testCaseRules;
    }

    public async Task<Unit> Handle(DeleteTestCaseCommandRequest request, CancellationToken cancellationToken)
    {

        var testCase = await unitOfWork.GetReadRepository<TestCase>()
            .GetAsync(predicate: q => q.Id == request.TestCaseId && q.IsDeleted == false
                    , include: q => q.Include(q => q.Question)) 
            ?? throw new Exception("No such test case found");

        var competition = await unitOfWork.GetReadRepository<Competition>()
            .GetAsync(predicate: c => c.Id == testCase.Question.CompetitionId && c.IsDeleted == false)
            ?? throw new Exception("No such competition found");


        await testCaseRules.CannotEditTestCaseAfterMadePublic(competition);

        await unitOfWork.GetWriteRepository<TestCase>().HardDeleteAsync(testCase);
        await unitOfWork.SaveAsync();

        return Unit.Value;
    }
}
