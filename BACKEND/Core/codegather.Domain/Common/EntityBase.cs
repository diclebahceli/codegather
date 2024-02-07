namespace codegather.Domain;
public class EntityBase : IEntityBase
{
    public int Id { get; set; }
    public DateTime CreatedTime { get; set; } = DateTime.Now;
    public bool IsDeleted { get; set; } = false;

}
