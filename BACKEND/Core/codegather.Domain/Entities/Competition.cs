namespace codegather.Domain;
public class Competition : EntityBase
{
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public ICollection<Question> Questions { get; set; } = new List<Question>();
    public ICollection<UserCompetition> UserCompetitions { get; set; } = new List<UserCompetition>();
    public bool IsPublic { get; set; } = false;

    public Competition() { }
    public Competition(string title, string description, DateTime startTime, DateTime endTime)
    {
        Title = title;
        Description = description;
        StartDate = startTime;
        EndDate = endTime;
    }
}
