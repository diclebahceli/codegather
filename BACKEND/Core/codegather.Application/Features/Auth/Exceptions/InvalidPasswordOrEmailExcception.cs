namespace codegather.Application;
public class InvalidPasswordOrEmailExcception: BaseException
{
    public InvalidPasswordOrEmailExcception() : base("Invalid password or email") { }
}
