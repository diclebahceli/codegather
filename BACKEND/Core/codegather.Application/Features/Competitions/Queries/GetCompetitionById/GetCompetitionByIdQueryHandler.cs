using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace codegather.Application;

public class GetCompetitionByIdQueryHandler : BaseHandler, IRequestHandler<GetCompetitionByIdQueryRequest, GetCompetitionByIdQueryResponse>
{
    public GetCompetitionByIdQueryHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public async Task<GetCompetitionByIdQueryResponse> Handle(GetCompetitionByIdQueryRequest request, CancellationToken cancellationToken)
    {
        var competition = await unitOfWork.GetReadRepository<Competition>().GetAsync(
               predicate: t => t.Id == request.Id && !t.IsDeleted,
               include: x => x
                   .Include(x => x.UserCompetitions)
                       .ThenInclude(uc => uc.User)
                   .Include(x => x.Questions.Where(q => !q.IsDeleted)),
               enableTracking: false
           ) ?? throw new Exception("Competition not found");

        return new GetCompetitionByIdQueryResponse()
        {
            Competition = mapper.Map<CompetitionDto, Competition>(competition),
            Questions = competition.Questions.Select(x => mapper.Map<QuestionDto, Question>(x)).ToList(),
            JoinedUsers = competition.UserCompetitions.Select(uc => mapper.Map<UserDto, User>(uc.User)).ToList(),
        };
    }
}
