using codegather.Application;
using codegather.Domain;

namespace codegather.Persistance;
public class WriteRepository<T> : IWriteRepository<T> where T : class, IEntityBase, new()
{

}
