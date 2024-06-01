using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace codegather.Application;
public class GetLastSubmissionQueryHander : BaseHandler, IRequestHandler<GetLastSubmissionQueryRequest, GetLastSubmissionQueryResponse>
{
    public GetLastSubmissionQueryHander(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public async Task<GetLastSubmissionQueryResponse> Handle(GetLastSubmissionQueryRequest request, CancellationToken cancellationToken)
    {
        var submissions = await unitOfWork.GetReadRepository<Submission>()
            .GetAllAsync(predicate: s => s.UserId == request.UserId 
                    && s.QuestionId == request.QuestionId 
                    && !s.IsDeleted, enableTracking: false, orderBy: s => s.OrderByDescending(s => s.LastModified));

        var last = submissions.FirstOrDefault();

        return new GetLastSubmissionQueryResponse
        {
            Submission = last == null ? null : mapper.Map<SubmissionDto, Submission>(last)
        };
    }
}
