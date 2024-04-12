using Bogus;
using codegather.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace codegather.Infrastructure;
public class SubmissionConfiguration : IEntityTypeConfiguration<Submission>
{
    public void Configure(EntityTypeBuilder<Submission> builder)
    {
        builder.HasOne(s => s.Metrics)
            .WithOne()
            .HasForeignKey<Submission>(s => s.MetricsId);

        // Faker faker = new();

        // Submission submission1 = new Submission
        // {
        //     Id = 1,
        //     QuestionId = 1,
        //     Code = faker.Lorem.Paragraph(),
        //     MetricsId = 1,
        //     SubmissionTime = DateTime.Now,
        //     IsCorrect = true
            
        // };

        // Submission submission2 = new Submission
        // {
        //     Id = 2,
        //     QuestionId = 1,
        //     MetricsId = 2,
        //     Code = faker.Lorem.Paragraph(),
        //     IsCorrect = true,
        //     SubmissionTime = DateTime.Now
        // };

        // Submission submission3 = new Submission
        // {
        //     Id = 3,
        //     QuestionId = 2,
        //     MetricsId = 3,
        //     Code = faker.Lorem.Paragraph(),
        //     IsCorrect = true,
        //     SubmissionTime = DateTime.Now
        // };

        // Submission submission4 = new Submission
        // {
        //     Id = 4,
        //     QuestionId = 2,
        //     MetricsId = 4,
        //     Code = faker.Lorem.Paragraph(),
        //     IsCorrect = false,
        //     SubmissionTime = DateTime.Now
        // };

        // builder.HasData(submission1, submission2, submission3, submission4);
    }
}
