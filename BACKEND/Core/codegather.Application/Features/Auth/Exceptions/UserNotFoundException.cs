namespace codegather.Application;
public class UserNotFoundException: BaseException
{
    public UserNotFoundException() : base("User not found") { }

}
