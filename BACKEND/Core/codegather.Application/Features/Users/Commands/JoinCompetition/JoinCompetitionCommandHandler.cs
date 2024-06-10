using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace codegather.Application;

public class JoinCompetitionCommandHandler : BaseHandler, IRequestHandler<JoinCompetitionCommandRequest, Unit>
{
    private readonly UserManager<User> userManager;
    private UserRules userRules;

    public JoinCompetitionCommandHandler(UserManager<User> userManager, IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor, UserRules userRules) : base(mapper, unitOfWork, httpContextAccessor)
    {
        this.userRules = userRules;
        this.userManager = userManager;
    }

    public async Task<Unit> Handle(JoinCompetitionCommandRequest request, CancellationToken cancellationToken)
    {
        var competition = await unitOfWork.GetReadRepository<Competition>()
            .GetAsync(predicate: t => t.Id == request.CompetitionId && !t.IsDeleted,
            include: x => x.Include(x => x.UserCompetitions)
                .ThenInclude(uc => uc.User),
            enableTracking: true);

        await userRules.CannotJoinEndedCompetition(competition);

        if (competition == null)
            throw new Exception("Competition not found");

        var user = await userManager.FindByIdAsync(request.UserId.ToString()) ?? throw new Exception("User not found");



        if (!competition.UserCompetitions.Any(uc => uc.UserId == user.Id))
        {
            competition.UserCompetitions.Add(new UserCompetition
            {
                Id = Guid.NewGuid(),
                CompetitionId = competition.Id,
                UserId = user.Id,
                Score = 0
            });
        }


        await unitOfWork.SaveAsync();
        return Unit.Value;

    }
}
