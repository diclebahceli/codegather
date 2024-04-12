using MediatR;

namespace codegather.Application;

public class JoinCompetitionQueryRequest : IRequest<Unit>   
{
    public Guid UserId { get; set; }
    public Guid CompetitionId { get; set; }
}
