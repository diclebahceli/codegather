using MediatR;

namespace codegather.Application;

public class DeleteCompetitionCommandRequest : IRequest
{
    public int Id { get; set; }
}
