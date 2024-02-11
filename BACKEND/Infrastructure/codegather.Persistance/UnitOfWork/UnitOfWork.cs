using codegather.Application;

namespace codegather.Persistance;
public class UnitOfWork : IUnitOfWork
{
    private AppDbContext dbContext;

    public UnitOfWork(AppDbContext dbContext)
    {
        this.dbContext = dbContext;

    }
    public ValueTask DisposeAsync() => dbContext.DisposeAsync();

    public int Save() => dbContext.SaveChanges();

    public async Task<int> SaveAsync() => await dbContext.SaveChangesAsync();

    IReadRepository<T> IUnitOfWork.GetReadRepository<T>() => new ReadRepository<T>(dbContext);

    IWriteRepository<T> IUnitOfWork.GetWriteRepository<T>() => new WriteRepository<T>(dbContext);
}
