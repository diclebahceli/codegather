using Bogus;
using codegather.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace codegather.Infrastructure;
public class CompetitionConfiguration : IEntityTypeConfiguration<Competition>
{
    public void Configure(EntityTypeBuilder<Competition> builder)
    {
        builder.Property(c => c.Title).IsRequired();
        //TODO: Add more configurations

        builder.HasMany(c => c.Questions)
        .WithOne(q => q.Competition)
        .HasForeignKey(q => q.CompetitionId);

        Faker faker = new();

        Competition comp1 = new Competition
        {
            Id = 1,
            Title = faker.Lorem.Sentence(2),
            Description = faker.Lorem.Paragraph(),
            StartTime = DateTime.Now,
            EndTime = DateTime.Now.AddDays(7)
        };

        Competition comp2 = new Competition
        {
            Id = 2,
            Title = faker.Lorem.Sentence(2),
            Description = faker.Lorem.Paragraph(),
            StartTime = DateTime.Now,
            EndTime = DateTime.Now.AddDays(7)
        };

        builder.HasData(comp1, comp2);
    }
}