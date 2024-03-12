using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace codegather.Application;
public class GetAllCompetitionsQueryHandler : IRequestHandler<GetAllCompetitionsQueryRequest, IList<GetAllCompetitionsQueryResponse>>
{
    private IUnitOfWork unityOfWork;
    private readonly IMapper mapper;
    public GetAllCompetitionsQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
    {
        unityOfWork = unitOfWork;
        this.mapper = mapper;
    }


    public async Task<IList<GetAllCompetitionsQueryResponse>> Handle(GetAllCompetitionsQueryRequest request, CancellationToken cancellationToken)
    {
        var Competitions = await unityOfWork.GetReadRepository<Competition>().GetAllAsync();
        // List<GetAllCompetitionsQueryResponse> responses = Competitions.Select(p => new GetAllCompetitionsQueryResponse
        // {
        //     Title = p.Title,
        //     Description = p.Description,
        //     EndTime = p.EndTime,
        //     StartTime = p.StartTime
        // }).ToList();

        var response = mapper.Map<GetAllCompetitionsQueryResponse, Competition>(Competitions);

        // return response;
        throw new Exception("hata mesaji: ");
    }
}
