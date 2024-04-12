using MediatR;

namespace codegather.Application;

public class GetCompetitionByIdQueryRequest : IRequest<GetCompetitionByIdQueryResponse>
{
    public Guid Id { get; set; }
}
