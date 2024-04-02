namespace codegather.Application;
public class LoginCommandResponse
{
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }
    public DateTime Expires { get; set; }


}
