namespace codegather.Application;

public class UserAlreadyExistsException : BaseException
{
    public UserAlreadyExistsException() : base("User already exists") { }
}
