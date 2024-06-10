using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace codegather.Application;

public class GetUserScoresQueryHandler : BaseHandler, IRequestHandler<GetUserScoresQueryRequest, GetUserScoresQueryResponse>
{
    public GetUserScoresQueryHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public async Task<GetUserScoresQueryResponse> Handle(GetUserScoresQueryRequest request, CancellationToken cancellationToken)
    {
        var usercomps = await unitOfWork.GetReadRepository<UserCompetition>().GetAllAsync(
                predicate: uc => uc.CompetitionId == request.CompetitionId,
                include: uc => uc.Include(uc => uc.User)
                ) ?? throw new Exception("Competition not found");

        var userScores = usercomps.Select(uc => new UserScoreDto
        {
            UserName = uc.User.UserName,
            Score = uc.Score
        });

        return new GetUserScoresQueryResponse
        {
            UserScores = userScores.ToList()
        };

    }
}
