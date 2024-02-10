using codegather.Application;
using codegather.Domain;
using Microsoft.EntityFrameworkCore;

namespace codegather.Persistance;
public class WriteRepository<T> : IWriteRepository<T> where T : class, IEntityBase, new()
{
    private readonly DbContext dbContext;

    public WriteRepository(DbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    private DbSet<T> Entities => dbContext.Set<T>();

    public async Task AddAsync(T entity)
    {
        await Entities.AddAsync(entity);
    }

    public async Task AddRangeAsync(IList<T> entities)
    {
        await Entities.AddRangeAsync(entities);
    }
    public async Task<T> UpdateAsync(T entity)
    {
        //update processes cannot be run asynchronously so we can combine it with Run
        await Task.Run(() => Entities.Update(entity));
        return entity;
    }

    public async Task HardDeleteAsync(T entity)
    {
        await Task.Run(() => Entities.Remove(entity));
    }
}
