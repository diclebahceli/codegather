using System.Linq.Expressions;
using codegather.Domain;
using Microsoft.EntityFrameworkCore.Query;

namespace codegather.Application;
public interface IReadRepository<T> where T : class, IEntityBase, new()
{
    Task<List<T>> GetAllAsync(Expression<Func<T, bool>>? predicate = null,
        Func<IQueryable<T>, IIncludableQueryable<T, object>>? include = null,
        Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
        bool enableTracking = false);

    Task<List<T>> GetAllByPagingAsync(Expression<Func<T, bool>>? predicate = null,
     Func<IQueryable<T>, IIncludableQueryable<T, object>>? include = null,
     Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
     bool enableTracking = false, int pageSize = 5, int currentPage = 1);

    Task<T> GetAsync(Expression<Func<T, bool>> predicate,
     Func<IQueryable<T>, IIncludableQueryable<T, object>>? include = null,
     bool enableTracking = false);

    IQueryable<T> Find(Expression<Func<T, bool>> predicate, bool enableTracking = false);

    Task<int> CountAsync(Expression<Func<T, bool>>? predicate = null);


}
