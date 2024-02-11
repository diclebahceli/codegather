using Bogus;
using codegather.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace codegather.Persistance;
public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasMany(u => u.Submissions)
            .WithOne(s => s.User)
            .HasForeignKey(s => s.UserId);

        User user1 = new User
        {
            Id = 1,
        };

        User user2 = new User
        {
            Id = 2,
        };

        builder.HasData(user1, user2);

    }
}
