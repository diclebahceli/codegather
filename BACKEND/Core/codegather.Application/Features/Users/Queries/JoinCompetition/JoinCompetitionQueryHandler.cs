using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace codegather.Application;

public class JoinCompetitionQueryHandler : BaseHandler, IRequestHandler<JoinCompetitionQueryRequest, Unit>
{
    private readonly UserManager<User> userManager;

    public JoinCompetitionQueryHandler(UserManager<User> userManager, IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
        this.userManager = userManager;
    }

    public async Task<Unit> Handle(JoinCompetitionQueryRequest request, CancellationToken cancellationToken)
    {
        var competition = await unitOfWork.GetReadRepository<Competition>().GetAsync(predicate: t => t.Id == request.CompetitionId && !t.IsDeleted, enableTracking: true);
        if (competition == null)
            throw new Exception("Competition not found");

        var user = await userManager.FindByIdAsync(request.UserId.ToString()) ?? throw new Exception("User not found");
        if (!user.Competitions.Contains(competition))
            user.Competitions.Add(competition);

        await unitOfWork.SaveAsync();
        return Unit.Value;

    }
}
