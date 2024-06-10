using Microsoft.AspNetCore.Identity;

namespace codegather.Domain;
public class User : IdentityUser<Guid>, IEntityBase
{
    public ICollection<Submission> Submissions { get; set; } = new List<Submission>();
    public ICollection<UserCompetition> UserCompetitions { get; set; } = new List<UserCompetition>();
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiryTime { get; set; }
    public byte[]? ProfileImage { get; set; }

    public User() { }
}
