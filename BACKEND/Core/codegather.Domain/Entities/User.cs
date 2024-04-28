using Microsoft.AspNetCore.Identity;

namespace codegather.Domain;
public class User : IdentityUser<Guid>, IEntityBase
{
    public ICollection<Submission> Submissions { get; set; } = new List<Submission>();
    public ICollection<Competition> Competitions { get; set; } = new List<Competition>();
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiryTime { get; set; }

    public User() { }

}
