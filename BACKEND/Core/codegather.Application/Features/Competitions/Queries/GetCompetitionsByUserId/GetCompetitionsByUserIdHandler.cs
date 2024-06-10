using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;

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
            var competitions = await unitOfWork.GetReadRepository<Competition>()
                .GetAllAsync(predicate: c => !c.IsDeleted && c.JoinedUsers.Any(u => u.Id == request.UserId));

            return new GetCompetitionsByUserIdResponse{
                Competitions = competitions.Select(c => mapper.Map<CompetitionDto, Competition>(c)).ToList()
            };
                    
        }
    }
}
