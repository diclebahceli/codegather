using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace codegather.Application;

public class UpdateTestCaseCommandHandler : BaseHandler, IRequestHandler<UpdateTestCaseCommandRequest, UpdateTestCaseCommandResponse>
{
    public UpdateTestCaseCommandHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public async Task<UpdateTestCaseCommandResponse> Handle(UpdateTestCaseCommandRequest request, CancellationToken cancellationToken)
    {
        var testCase = await unitOfWork.GetReadRepository<TestCase>().GetAsync(predicate: q => q.Id == request.TestCase.Id && q.IsDeleted == false) ?? throw new Exception("No such test case found");

        testCase.Input = request.TestCase.Input;
        testCase.Output = request.TestCase.Output;

        await unitOfWork.GetWriteRepository<TestCase>().UpdateAsync(testCase);
        await unitOfWork.SaveAsync();

        return new UpdateTestCaseCommandResponse
        {
            TestCase = mapper.Map<TestCaseDto, TestCase>(testCase)
        };
    }
}
