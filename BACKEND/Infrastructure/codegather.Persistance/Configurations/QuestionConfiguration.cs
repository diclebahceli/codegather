using Bogus;
using codegather.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace codegather.Infrastructure;
public class QuestionConfiguration : IEntityTypeConfiguration<Question>
{
    public void Configure(EntityTypeBuilder<Question> builder)
    {
        builder.Property(q => q.Description).IsRequired();
        //TODO: Add more configurations

        Faker faker = new();

        Question question1 = new Question
        {
            Id = 1,
            CompetitionId = 1,
            Description = faker.Lorem.Paragraph(),
            TestCases = "Test case 1, Test case 2, Test case 3"
        };
        
        Question question2 = new Question
        {
            Id = 2,
            CompetitionId = 1,
            Description = faker.Lorem.Paragraph(),
            TestCases = "Test case 1, Test case 2, Test case 3"
        };

        Question question3 = new Question
        {
            Id = 3,
            CompetitionId = 2,
            Description = faker.Lorem.Paragraph(),
            TestCases = "Test case 1, Test case 2, Test case 3"
        };

        Question question4 = new Question
        {
            Id = 4,
            CompetitionId = 2,
            Description = faker.Lorem.Paragraph(),
            TestCases = "Test case 1, Test case 2, Test case 3"
        };

        builder.HasData(question1, question2, question3, question4);

    }
}
