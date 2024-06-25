namespace codegather.Domain;
public class Question : EntityBase
{
    public Competition Competition { get; set; }
    public Guid CompetitionId { get; set; }
    public string Name { get; set; }
    public ICollection<Submission> Submissions { get; set; } = new List<Submission>();
    public string Description { get; set; }
    public ICollection<TestCase> TestCases { get; set; } = new List<TestCase>();
    public string StarterCode { get; set; }
    public ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public Question() { }
    public Question(Competition competition, string description, ICollection<TestCase> testCases, string starterCode)
    {
        Competition = competition;
        Description = description;
        TestCases = testCases;
        StarterCode = starterCode;
    }

}
