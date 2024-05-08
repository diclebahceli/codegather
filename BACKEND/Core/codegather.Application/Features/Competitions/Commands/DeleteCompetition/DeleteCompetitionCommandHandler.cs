using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;

namespace codegather.Application;

public class DeleteCompetitionCommandHandler : IRequestHandler<DeleteCompetitionCommandRequest,Unit>
{
    private readonly IUnitOfWork _unitOfWork;
    public DeleteCompetitionCommandHandler(IUnitOfWork unitOfWork)
    {
        this._unitOfWork = unitOfWork;
    }

    public async Task<Unit> Handle(DeleteCompetitionCommandRequest request, CancellationToken cancellationToken)
    {
        var competition = await _unitOfWork.GetReadRepository<Competition>().GetAsync(x => x.Id == request.Id && !x.IsDeleted, enableTracking: true);


        competition.IsDeleted = true;
        await _unitOfWork.GetWriteRepository<Competition>().UpdateAsync(competition);
        await _unitOfWork.SaveAsync();

        return Unit.Value;


    }
}
