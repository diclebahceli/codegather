using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;

namespace codegather.Application;
public class GetAllCompetitionsQueryHandler : IRequestHandler<GetAllCompetitionsQueryRequest, GetAllCompetitionsQueryResponse>
{
    private IUnitOfWork unityOfWork;
    private readonly IMapper mapper;
    public GetAllCompetitionsQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
    {
        unityOfWork = unitOfWork;
        this.mapper = mapper;
    }


    public async Task<GetAllCompetitionsQueryResponse> Handle(GetAllCompetitionsQueryRequest request, CancellationToken cancellationToken)
    {
        var competitions = await unityOfWork.GetReadRepository<Competition>().GetAllAsync(predicate: c => !c.IsDeleted, enableTracking: false);

        return new GetAllCompetitionsQueryResponse
        {
            Competitions = competitions.Select(c => mapper.Map<CompetitionDto, Competition>(c)).ToList()
        };
    }


}
