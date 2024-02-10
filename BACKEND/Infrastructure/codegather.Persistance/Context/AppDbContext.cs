using System.Reflection;
using codegather.Domain;
using Microsoft.EntityFrameworkCore;

namespace codegather.Persistance;
public class AppDbContext : DbContext
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
}
