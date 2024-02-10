namespace codegather.Domain;
public class Question: EntityBase
{
    public Competition Competition {get; set;}
    public int CompetitionId {get; set;}
    public ICollection<Submission> Submissions {get; set;}
    public string Description {get; set;}
    public string TestCases {get; set;}

    public Question(){ }
    public Question(Competition competition, string description, string testCases){
        Competition = competition;
        Description = description;
        TestCases = testCases;
    }

}
