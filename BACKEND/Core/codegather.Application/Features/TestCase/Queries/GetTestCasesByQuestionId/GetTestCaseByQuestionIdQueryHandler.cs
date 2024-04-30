using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace codegather.Application;

public class GetTestCaseByQuestionIdQueryHandler : BaseHandler, IRequestHandler<GetTestCaseByQuestionIdQueryRequest, GetTestCaseByQuestionIdQueryResponse>
{
    public GetTestCaseByQuestionIdQueryHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public async Task<GetTestCaseByQuestionIdQueryResponse> Handle(GetTestCaseByQuestionIdQueryRequest request, CancellationToken cancellationToken)
    {
        var testCases = await unitOfWork.GetReadRepository<TestCase>().GetAllAsync(predicate: q => q.QuestionId == request.QuestionId && !q.IsDeleted) ?? throw new Exception("No such question found");

        return new GetTestCaseByQuestionIdQueryResponse
        {
            TestCases = testCases
        };
    }
}
