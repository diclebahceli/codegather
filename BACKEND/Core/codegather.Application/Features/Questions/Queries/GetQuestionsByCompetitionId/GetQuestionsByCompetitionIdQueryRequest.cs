using MediatR;

namespace codegather.Application;

public class GetQuestionsByCompetitionIdQueryRequest : IRequest<GetQuestionsByCompetitionIdQueryResponse>
{
    public Guid CompetitionId { get; set; }
}
