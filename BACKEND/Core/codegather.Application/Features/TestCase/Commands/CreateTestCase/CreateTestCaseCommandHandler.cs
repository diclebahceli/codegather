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
        await unitOfWork.GetWriteRepository<TestCase>().AddAsync(request.TestCase);
        await unitOfWork.SaveAsync();
        return new CreateTestCaseCommandResponse
        {
            TestCase = request.TestCase
        };
    }
}
