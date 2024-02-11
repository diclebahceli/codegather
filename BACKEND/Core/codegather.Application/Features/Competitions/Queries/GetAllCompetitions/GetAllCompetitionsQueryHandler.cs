using codegather.Domain;
using MediatR;

namespace codegather.Application;
public class GetAllCompetitionsQueryHandler : IRequestHandler<GetAllCompetitionsQueryRequest, IList<GetAllCompetitionsQueryResponse>>
{
    private IUnitOfWork unityOfWork;
    public GetAllCompetitionsQueryHandler(IUnitOfWork unitOfWork)
    {
        unityOfWork = unitOfWork;
    }


    public async Task<IList<GetAllCompetitionsQueryResponse>> Handle(GetAllCompetitionsQueryRequest request, CancellationToken cancellationToken)
    {
        var Competitions = await unityOfWork.GetReadRepository<Competition>().GetAllAsync();
        List<GetAllCompetitionsQueryResponse> responses = Competitions.Select(p => new GetAllCompetitionsQueryResponse
        {
            Title = p.Title,
            Description = p.Description,
            EndTime = p.EndTime,
            StartTime = p.StartTime
        }).ToList();
        return responses;
    }
}
