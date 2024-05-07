using codegather.Domain;

namespace codegather.Application;
public class CompetitionRules : BaseRules
{
    public Task CompetitionNameMustBeUnique(List<Competition> competitions, string name)
    {
        if (competitions.Any(c => c.Title == name))
            throw new CompetitionNameMustBeUniqueException(name);
        return Task.CompletedTask;
    }

    public Task CantChangeCompetitionStartDateIfCompetitionStarted(Competition competition, Competition newCompetition)
    {
        if (competition.StartDate < DateTime.Now && competition.StartDate != newCompetition.StartDate)
            throw new Exception("Can't change start date, competition already started");
        if (competition.EndDate < DateTime.Now && competition.EndDate != newCompetition.EndDate)
            throw new Exception("Can't change end date, competition already ended");

        return Task.CompletedTask;
    }

}

