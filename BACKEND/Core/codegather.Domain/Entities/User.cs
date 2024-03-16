namespace codegather.Domain;
public class User: EntityBase
{
    public ICollection<Submission> Submissions {get; set;}
    public User(){}

}
