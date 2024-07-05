public class UserDto
{
    public Guid Id { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public double Score { get; set; } = 0;
    public byte[] ProfileImage { get; set; }
}
