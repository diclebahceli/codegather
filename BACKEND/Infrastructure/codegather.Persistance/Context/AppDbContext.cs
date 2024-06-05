using System.Reflection;
using codegather.Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace codegather.Persistance;
public class AppDbContext : IdentityDbContext<User, Role, Guid>
{

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Competition> Competitions { get; set; }
    public DbSet<Question> Questions { get; set; }

    public DbSet<Submission> Submissions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
    {
        foreach (var entry in ChangeTracker.Entries<EntityBase>().Where(e => e.State == EntityState.Modified))
        {
            switch (entry.State)
            {
                case EntityState.Modified:
                    entry.Entity.LastModified = DateTime.Now;
                    break;
                case EntityState.Added:
                    entry.Entity.CreatedTime = DateTime.Now;
                    entry.Entity.LastModified = DateTime.Now;
                    break;
            }
        }
        return base.SaveChangesAsync(cancellationToken);
    }
}
