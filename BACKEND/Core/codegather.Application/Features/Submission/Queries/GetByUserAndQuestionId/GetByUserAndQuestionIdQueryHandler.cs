using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace codegather.Application;
public class GetByUserAndQuestionIdQueryHandler : BaseHandler, IRequestHandler<GetByUserAndQuestionIdQueryRequest, GetByUserAndQuestionIdQueryResponse>
{
    public GetByUserAndQuestionIdQueryHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public async Task<GetByUserAndQuestionIdQueryResponse> Handle(GetByUserAndQuestionIdQueryRequest request, CancellationToken cancellationToken)
    {
        var submissions = await unitOfWork.GetReadRepository<Submission>()
            .GetAllAsync(predicate: s => s.QuestionId == request.QuestionId
                    && s.UserId == request.UserId
                    && !s.IsDeleted, enableTracking: false)
            ?? new List<Submission>();


        return new GetByUserAndQuestionIdQueryResponse
        {
            Submissions = submissions.Select(s => mapper.Map<SubmissionDto, Submission>(s)).ToList()
        };

    }
}
