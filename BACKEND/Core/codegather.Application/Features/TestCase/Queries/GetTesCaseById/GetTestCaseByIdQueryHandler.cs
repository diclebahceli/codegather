using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace codegather.Application;

public class GetTestCaseByIdQueryHandler : BaseHandler, IRequestHandler<GetTestCaseByIdQueryRequest, GetTestCaseByIdQueryResponse>
{
    public GetTestCaseByIdQueryHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public async Task<GetTestCaseByIdQueryResponse> Handle(GetTestCaseByIdQueryRequest request, CancellationToken cancellationToken)
    {
        var testCase = await unitOfWork.GetReadRepository<TestCase>().GetAsync(predicate: q => q.Id == request.Id && q.IsDeleted == false) ?? throw new Exception("No such test case found");

        return new GetTestCaseByIdQueryResponse
        {
            TestCase = mapper.Map<TestCase>(testCase)
        };
    }
}
