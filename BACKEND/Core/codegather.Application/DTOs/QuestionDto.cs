using codegather.Domain;

namespace codegather.Application;
public class QuestionDto
{
    public Guid Id { get; set; }
    public Guid CompetitionId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string StarterCode { get; set; }

}
