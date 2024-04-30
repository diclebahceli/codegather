using MediatR;

namespace codegather.Application;

public class UpdateCompetitionCommandRequest : IRequest<Unit>
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public bool IsPublic { get; set; }
}
