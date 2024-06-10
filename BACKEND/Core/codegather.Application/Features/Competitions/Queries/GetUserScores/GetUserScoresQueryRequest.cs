using MediatR;

namespace codegather.Application
{
    public class GetUserScoresQueryRequest : IRequest<GetUserScoresQueryResponse>
    {
        public Guid CompetitionId { get; set; }
    }
}
