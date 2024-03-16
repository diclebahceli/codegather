using codegather.Domain;
using MediatR;

namespace codegather.Application;

public class CreateCompetitionCommandHandler : IRequestHandler<CreateCompetitionCommandRequest, Unit>
{

    private readonly IUnitOfWork _unitOfWork;
    public CreateCompetitionCommandHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;

    }

    public async Task<Unit> Handle(CreateCompetitionCommandRequest request, CancellationToken cancellationToken)
    {
        Competition competition = new(request.Title, request.Description, request.StartTime, request.EndTime);
        await _unitOfWork.GetWriteRepository<Competition>().AddAsync(competition);
        await _unitOfWork.SaveAsync();

        return Unit.Value;
    }
}
