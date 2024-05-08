using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace codegather.Application;

public class GetQuestionsByCompetitionIdQueryHandler : BaseHandler, IRequestHandler<GetQuestionsByCompetitionIdQueryRequest, GetQuestionsByCompetitionIdQueryResponse>
{
    public GetQuestionsByCompetitionIdQueryHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public async Task<GetQuestionsByCompetitionIdQueryResponse> Handle(GetQuestionsByCompetitionIdQueryRequest request, CancellationToken cancellationToken)
    {
        mapper.AddConfig<SubmissionDto, Submission>();
        mapper.AddConfig<TestCaseDto, TestCase>();
        var competition = await unitOfWork.GetReadRepository<Competition>()
            .GetAsync(predicate: c => c.Id == request.CompetitionId && !c.IsDeleted, enableTracking: false
                    , include: c => c.Include(c => c.Questions.Where(q => !q.IsDeleted)))
            ?? throw new Exception("Competition not found");


        return new GetQuestionsByCompetitionIdQueryResponse()
        {
            Questions = competition.Questions.Select(x => mapper.Map<DetailedQuestionDto, Question>(x)).ToList(),
        };
    }
}
