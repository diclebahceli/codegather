using codegather.Application;

namespace codegather.Application;
public class CompetitionNameMustBeUniqueException : BaseException
{
    //ctor with base
    public CompetitionNameMustBeUniqueException(string name) : base($"Competition with name {name} already exists.")
    {
    }


}
