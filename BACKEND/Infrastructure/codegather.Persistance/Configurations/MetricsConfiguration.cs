using Bogus;
using codegather.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace codegather.Infrastructure;
public class MetricsConfiguration : IEntityTypeConfiguration<Metrics>
{
    public void Configure(EntityTypeBuilder<Metrics> builder)
    {

    }
}
