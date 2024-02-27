using Bogus;
using codegather.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace codegather.Infrastructure;
public class MetricsConfiguration : IEntityTypeConfiguration<Metrics>
{
    public void Configure(EntityTypeBuilder<Metrics> builder)
    {
        Faker faker = new();

        Metrics metrics1 = new Metrics
        {
            Id = 1,
            CompileTime = 0.5f,
            MemoryUsage = 0.5f
        };

        Metrics metrics2 = new Metrics
        {
            Id = 2,
            CompileTime = 0.5f,
            MemoryUsage = 0.5f
        };
        
        Metrics metrics3 = new Metrics
        {
            Id = 3,
            CompileTime = 0.5f,
            MemoryUsage = 0.5f
        };

        Metrics metrics4 = new Metrics
        {
            Id = 4,
            CompileTime = 0.5f,
            MemoryUsage = 0.5f
        };

        builder.HasData(metrics1, metrics2, metrics3, metrics4);

    }
}
