using codegather.Domain;
using MediatR;

namespace codegather.Application;

public class CreateCompetitionCommandHandler : IRequestHandler<CreateCompetitionCommandRequest, Unit>
{

    private readonly IUnitOfWork _unitOfWork;
    private readonly CompetitionRules competitionRules;
    public CreateCompetitionCommandHandler(IUnitOfWork unitOfWork, CompetitionRules competitionRules)
    {
        this.competitionRules = competitionRules;
        _unitOfWork = unitOfWork;

    }

    public async Task<Unit> Handle(CreateCompetitionCommandRequest request, CancellationToken cancellationToken)
    {
        Competition competition = new(request.Title, request.Description, request.StartDate, request.EndDate);

        var competitions = await _unitOfWork.GetReadRepository<Competition>().GetAllAsync();

        await competitionRules.CompetitionNameMustBeUnique(competitions, request.Title);

        await _unitOfWork.GetWriteRepository<Competition>().AddAsync(competition);
        await _unitOfWork.SaveAsync();

        return Unit.Value;
    }
}
