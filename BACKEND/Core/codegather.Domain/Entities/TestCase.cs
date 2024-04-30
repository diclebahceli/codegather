namespace codegather.Domain;

public class TestCase: EntityBase
{
    public Guid QuestionId {get; set;}
    public string Input {get; set;}
    public string Output {get; set;}
}
