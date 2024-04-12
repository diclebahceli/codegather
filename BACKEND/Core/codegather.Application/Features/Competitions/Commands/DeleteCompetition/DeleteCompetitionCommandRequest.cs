using MediatR;

namespace codegather.Application;

public class DeleteCompetitionCommandRequest : IRequest<Unit>
{
    public Guid Id { get; set; }
}
