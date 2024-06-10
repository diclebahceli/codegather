using codegather.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace codegather.Infrastructure;
public class UserCompetitionConfiguration : IEntityTypeConfiguration<UserCompetition>
{
    public void Configure(EntityTypeBuilder<UserCompetition> builder)
    {
        builder.HasKey(uc => new { uc.UserId, uc.CompetitionId });

        builder.HasOne(uc => uc.User)
            .WithMany(u => u.UserCompetitions)
            .HasForeignKey(uc => uc.UserId);

        builder.HasOne(uc => uc.Competition)
            .WithMany(c => c.UserCompetitions)
            .HasForeignKey(uc => uc.CompetitionId);

        builder.Property(uc => uc.Score)
            .IsRequired();
    }
}
