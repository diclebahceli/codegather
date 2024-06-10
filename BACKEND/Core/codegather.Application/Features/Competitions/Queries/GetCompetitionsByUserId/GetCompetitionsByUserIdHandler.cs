using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace codegather.Application
{
    public class GetCompetitionsByUserIdHandler : BaseHandler
        , IRequestHandler<GetCompetitionsByUserIdRequest, GetCompetitionsByUserIdResponse>
    {
        public GetCompetitionsByUserIdHandler(IMapper mapper, IUnitOfWork unitOfWork
            , IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
        {
        }

        public async Task<GetCompetitionsByUserIdResponse> Handle(GetCompetitionsByUserIdRequest request, CancellationToken cancellationToken)
        {
            var userCompetitions = await unitOfWork.GetReadRepository<UserCompetition>().GetAllAsync(
               predicate: c => !c.IsDeleted && c.UserId == request.UserId,
               include: c => c.Include(c => c.Competition),
               enableTracking: false);

            var competitions = userCompetitions.Select(uc => uc.Competition).ToList();

            return new GetCompetitionsByUserIdResponse{
                Competitions = competitions.Select(c => mapper.Map<CompetitionDto, Competition>(c)).ToList()
            };
                    
        }
    }
}
