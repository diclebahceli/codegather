using MediatR;

namespace codegather.Application
{
    public class GetCompetitionsByUserIdRequest: IRequest<GetCompetitionsByUserIdResponse>
    {
        public Guid UserId { get; set; }
    }
}
