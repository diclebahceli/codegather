namespace codegather.Domain;
public class EntityBase : IEntityBase
{
    public Guid Id { get; set; }
    public DateTime CreatedTime { get; set; } = DateTime.Now;
    public DateTime LastModified { get; set; } = DateTime.Now;
    public bool IsDeleted { get; set; } = false;

}
