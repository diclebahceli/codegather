namespace codegather.Domain;
public class Competition: EntityBase
{
    public string Title {get; set;}
    public string Description {get; set;}
    public DateTime StartTime {get; set;} 
    public DateTime EndTime {get; set;} 
    public ICollection<Question> Questions {get; set;} 

    public Competition(string title, string description, DateTime startTime, DateTime endTime){
        Title = title;
        Description = description;
        StartTime = startTime;
        EndTime = endTime;
    }

}
