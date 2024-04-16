namespace codegather.Domain;
public class Competition : EntityBase
{
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public ICollection<Question> Questions { get; set; } = new List<Question>();
    public ICollection<User> JoinedUsers { get; set; } = new List<User>();

    public Competition() { }
    public Competition(string title, string description, DateTime startTime, DateTime endTime)
    {
        Title = title;
        Description = description;
        StartDate = startTime;
        EndDate = endTime;
    }

}
