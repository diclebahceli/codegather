using Bogus;
using codegather.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace codegather.Infrastructure;
public class CompetitionConfiguration : IEntityTypeConfiguration<Competition>
{
    public void Configure(EntityTypeBuilder<Competition> builder)
    {
        builder.HasMany(c => c.Questions)
        .WithOne(q => q.Competition)
        .HasForeignKey(q => q.CompetitionId);
    }
}
