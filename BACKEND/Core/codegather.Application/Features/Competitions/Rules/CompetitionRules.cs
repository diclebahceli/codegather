using codegather.Domain;

namespace codegather.Application;
public class CompetitionRules : BaseRule
{
    public Task CompetitionNameMustBeUnique(List<Competition> competitions, string name)
    {
        if (competitions.Any(c => c.Title == name))
            throw new CompetitionNameMustBeUniqueException(name);
        return Task.CompletedTask;
    }

}
