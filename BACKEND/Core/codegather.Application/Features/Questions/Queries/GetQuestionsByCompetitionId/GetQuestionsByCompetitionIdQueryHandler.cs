using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace codegather.Application;

public class GetQuestionsByCompetitionIdQueryHandler : BaseHandler, IRequestHandler<GetQuestionsByCompetitionIdQueryRequest, GetQuestionsByCompetitionIdQueryResponse>
{
    public GetQuestionsByCompetitionIdQueryHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public async Task<GetQuestionsByCompetitionIdQueryResponse> Handle(GetQuestionsByCompetitionIdQueryRequest request, CancellationToken cancellationToken)
    {
        var competition = await unitOfWork.GetReadRepository<Competition>()
            .GetAsync(predicate: c => c.Id == request.CompetitionId, enableTracking: false)
            ?? throw new Exception("Competition not found");

        var questions = await unitOfWork.GetReadRepository<Question>()
            .GetAllAsync(predicate: q => q.CompetitionId == request.CompetitionId && !q.IsDeleted, enableTracking: false);

        return new GetQuestionsByCompetitionIdQueryResponse()
        {
            Questions = questions.Select(x => mapper.Map<QuestionDto, Question>(x)).ToList(),
        };
    }
}
