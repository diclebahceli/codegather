using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace codegather.Application;

public class UpdateCompetitionCommandHandler : IRequestHandler<UpdateCompetitionCommandRequest, Unit>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly CompetitionRules competitionRules;
    public UpdateCompetitionCommandHandler(IUnitOfWork unitOfWork, IMapper mapper, CompetitionRules competitionRules)
    {
        this.competitionRules = competitionRules;
        this._unitOfWork = unitOfWork;
        this._mapper = mapper;
    }
    public async Task<Unit> Handle(UpdateCompetitionCommandRequest request, CancellationToken cancellationToken)
    {
        var competition = await _unitOfWork.GetReadRepository<Competition>()
            .GetAsync(x => x.Id == request.Id && !x.IsDeleted, enableTracking: true
                    , include: c => c.Include(c => c.Questions.Where(q => !q.IsDeleted))
                                     .ThenInclude(q => q.TestCases))
            ?? throw new Exception("No such competition found");


        var competitions = await _unitOfWork.GetReadRepository<Competition>().GetAllAsync();

        var otherComps = competitions.Where(c => c.Id != competition.Id).ToList();
        await competitionRules.CompetitionNameMustBeUnique(otherComps, request.Title);

        var newComp = _mapper.Map<Competition, UpdateCompetitionCommandRequest>(request);
        await competitionRules.CantMakePrivateAfterMadePublic(competition, newComp);
        await competitionRules.CantChangeCompetitionStartDateIfMadePublic(competition, newComp);
        await competitionRules.NeedsQuestionAndTestCaseToBePublic(newComp, competition.Questions.ToList());

        competition.Title = newComp.Title;
        competition.Description = newComp.Description;
        competition.StartDate = newComp.StartDate;
        competition.EndDate = newComp.EndDate;
        competition.IsPublic = newComp.IsPublic;

        await _unitOfWork.GetWriteRepository<Competition>().UpdateAsync(competition);
        await _unitOfWork.SaveAsync();

        return Unit.Value;
    }
}
