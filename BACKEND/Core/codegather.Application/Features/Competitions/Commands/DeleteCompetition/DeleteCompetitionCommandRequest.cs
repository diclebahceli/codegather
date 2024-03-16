using MediatR;

namespace codegather.Application;

public class DeleteCompetitionCommandRequest : IRequest<Unit>
{
    public int Id { get; set; }
}
