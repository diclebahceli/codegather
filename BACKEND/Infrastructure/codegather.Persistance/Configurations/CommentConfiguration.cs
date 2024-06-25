using Bogus;
using codegather.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace codegather.Persistance;
public class CommentConfiguration : IEntityTypeConfiguration<Comment>
{
    public void Configure(EntityTypeBuilder<Comment> builder)
    {
        builder.HasOne(c => c.User)
            .WithMany(u => u.Comments)
            .HasForeignKey(c => c.UserId);

        builder.HasOne(c => c.Question)
            .WithMany(q => q.Comments)
            .HasForeignKey(c => c.QuestionId);

    }

}
