using System.ComponentModel;
using MediatR;

namespace codegather.Application;

public class CreateCompetitionCommandRequest : IRequest<Unit>
{
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    [DefaultValue(false)]
    public bool IsPublic { get; set; }
}
