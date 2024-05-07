using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace codegather.Application;

public class CreateTestCaseCommandHandler : BaseHandler, IRequestHandler<CreateTestCaseCommandRequest, CreateTestCaseCommandResponse>
{
    private readonly TestCaseRules testCaseRules;

    public CreateTestCaseCommandHandler(TestCaseRules testCaseRules, IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
        this.testCaseRules = testCaseRules;
    }

    public async Task<CreateTestCaseCommandResponse> Handle(CreateTestCaseCommandRequest request, CancellationToken cancellationToken)
    {

        var question = await unitOfWork.GetReadRepository<Question>()
            .GetAsync(predicate: q => q.Id == request.QuestionId && !q.IsDeleted, include: q => q.Include(q => q.Competition))
            ?? throw new Exception("No such question exist!");

        await testCaseRules.CannotEditTestCaseAfterMadePublic(question.Competition);

        var newTestCase = mapper.Map<TestCase, CreateTestCaseCommandRequest>(request);
        await unitOfWork.GetWriteRepository<TestCase>().AddAsync(newTestCase);
        await unitOfWork.SaveAsync();
        return new CreateTestCaseCommandResponse
        {
            TestCase = mapper.Map<TestCaseDto, TestCase>(newTestCase)

        };
    }
}
