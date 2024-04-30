using System.ComponentModel;
using MediatR;

namespace codegather.Application;

public class CreateCompetitionCommandRequest : IRequest<Unit>
{
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    [DefaultValue(false)]
    public bool IsPublic { get; set; }
}
