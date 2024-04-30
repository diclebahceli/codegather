using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;

namespace codegather.Application;

public class UpdateCompetitionCommandHandler : IRequestHandler<UpdateCompetitionCommandRequest, Unit>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    public UpdateCompetitionCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
    {
        this._unitOfWork = unitOfWork;
        this._mapper = mapper;
    }
    public async Task<Unit> Handle(UpdateCompetitionCommandRequest request, CancellationToken cancellationToken)
    {
        var competition = await _unitOfWork.GetReadRepository<Competition>().GetAsync(x => x.Id == request.Id && !x.IsDeleted, enableTracking: true) ?? throw new Exception("No such competition found");
        var newObject = _mapper.Map<Competition, UpdateCompetitionCommandRequest>(request);
        competition.Title = newObject.Title;
        competition.Description = newObject.Description;
        competition.StartDate = newObject.StartDate;
        competition.EndDate = newObject.EndDate;
        competition.IsPublic = newObject.IsPublic;

        await _unitOfWork.GetWriteRepository<Competition>().UpdateAsync(competition);
        await _unitOfWork.SaveAsync();

        return Unit.Value;
    }
}
