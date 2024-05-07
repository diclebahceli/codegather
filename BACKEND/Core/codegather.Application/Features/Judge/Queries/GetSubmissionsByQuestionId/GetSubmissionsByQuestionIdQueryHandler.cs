using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace codegather.Application;

public class GetSubmissionsByQuestionIdQueryHandler : BaseHandler, IRequestHandler<GetSubmissionsByQuestionIdQueryRequest, GetSubmissionsByQuestionIdQueryResponse>
{
    public GetSubmissionsByQuestionIdQueryHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public async Task<GetSubmissionsByQuestionIdQueryResponse> Handle(GetSubmissionsByQuestionIdQueryRequest request, CancellationToken cancellationToken)
    {
        var submissions = await unitOfWork.GetReadRepository<Submission>().GetAllAsync(predicate: s => s.QuestionId == request.QuestionId && !s.IsDeleted, enableTracking: false) ?? throw new Exception("Submissions not found");

        return new GetSubmissionsByQuestionIdQueryResponse
        {
            Submissions = submissions
        };
    }
}
