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


        builder.HasMany(u => u.Competitions)
            .WithMany(c => c.JoinedUsers); ;
    }

}
