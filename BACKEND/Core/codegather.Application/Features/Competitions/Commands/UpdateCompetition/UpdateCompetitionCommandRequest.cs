using MediatR;

namespace codegather.Application;

public class UpdateCompetitionCommandRequest : IRequest
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
}
