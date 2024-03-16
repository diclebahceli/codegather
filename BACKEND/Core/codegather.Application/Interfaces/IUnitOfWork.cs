using codegather.Domain;

namespace codegather.Application;
public interface IUnitOfWork
{
    IReadRepository<T> GetReadRepository<T>() where T: class, IEntityBase, new();
    IWriteRepository<T> GetWriteRepository<T>() where T: class, IEntityBase, new();

    Task<int> SaveAsync();
    int Save();
}
