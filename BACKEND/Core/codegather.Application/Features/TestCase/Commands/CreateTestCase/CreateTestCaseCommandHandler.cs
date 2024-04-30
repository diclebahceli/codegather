using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace codegather.Application;

public class CreateTestCaseCommandHandler : BaseHandler, IRequestHandler<CreateTestCaseCommandRequest, CreateTestCaseCommandResponse>
{
    public CreateTestCaseCommandHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public async Task<CreateTestCaseCommandResponse> Handle(CreateTestCaseCommandRequest request, CancellationToken cancellationToken)
    {

        var question = unitOfWork.GetReadRepository<Question>().GetAsync(predicate: q => q.Id == request.QuestionId) ?? throw new Exception("No such question exist!");
        var newTestCase = mapper.Map<TestCase, CreateTestCaseCommandRequest>(request);
        await unitOfWork.GetWriteRepository<TestCase>().AddAsync(newTestCase);
        await unitOfWork.SaveAsync();
        return new CreateTestCaseCommandResponse
        {
            TestCase = mapper.Map<TestCaseDto, TestCase>(newTestCase)

        };
    }
}
