using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace codegather.Application;

public class GetAllQuestionsQueryHandler
{

    private IUnitOfWork unityOfWork;
    private readonly IMapper mapper;
    public GetAllQuestionsQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
    {
        unityOfWork = unitOfWork;
        this.mapper = mapper;
    }


    public async Task<IList<GetAllQuestionsQueryResponse>> Handle(GetAllCompetitionsQueryRequest request, CancellationToken cancellationToken)
    {
        var Questions = await unityOfWork.GetReadRepository<Question>().GetAllAsync(include: q => q.Include(q => q.Competition));
        mapper.Config<CompetitionDto, Competition>();
        // List<GetAllCompetitionsQueryResponse> responses = Competitions.Select(p => new GetAllCompetitionsQueryResponse
        // {
        //     Title = p.Title,
        //     Description = p.Description,
        //     EndTime = p.EndTime,
        //     StartTime = p.StartTime
        // }).ToList();

        var response = mapper.Map<GetAllQuestionsQueryResponse, Question>(Questions);

        return response;
    }
}
