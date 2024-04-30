using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace codegather.Application;

public class DeleteTestCaseCommandHandler : BaseHandler, IRequestHandler<DeleteTestCaseCommandRequest, Unit>
{
    public DeleteTestCaseCommandHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public async Task<Unit> Handle(DeleteTestCaseCommandRequest request, CancellationToken cancellationToken)
    {
        var testCase = await unitOfWork.GetReadRepository<TestCase>().GetAsync(predicate: q => q.Id == request.TestCaseId && !q.IsDeleted) ?? throw new Exception("No such test case found");

        testCase.IsDeleted = true;

        await unitOfWork.GetWriteRepository<TestCase>().UpdateAsync(testCase);
        await unitOfWork.SaveAsync();

        return Unit.Value;
    }
}
