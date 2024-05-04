namespace codegather.Domain;
public class Question : EntityBase
{
    public Competition Competition { get; set; }
    public Guid CompetitionId { get; set; }
    public string Name { get; set; }
    public ICollection<Submission> Submissions { get; set; }
    public string Description { get; set; }
    public ICollection<TestCase> TestCases { get; set; }
    public string StarterCode { get; set; }

    public Question() { }
    public Question(Competition competition, string description, ICollection<TestCase> testCases, string starterCode)
    {
        Competition = competition;
        Description = description;
        TestCases = testCases;
        StarterCode = starterCode;
    }

}
