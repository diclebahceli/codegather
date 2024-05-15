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

    public Task CantChangeCompetitionStartDateIfMadePublic(Competition competition, Competition newCompetition)
    {
        if (competition.StartDate < DateTime.Now && competition.StartDate != newCompetition.StartDate && competition.IsPublic)
            throw new Exception("Can't change start date, competition already started");
        if (competition.EndDate < DateTime.Now && competition.EndDate != newCompetition.EndDate && competition.IsPublic)
            throw new Exception("Can't change end date, competition already ended");

        return Task.CompletedTask;
    }

    public Task CantMakePrivateAfterMadePublic(Competition comp, Competition newComp)
    {
        if (comp.IsPublic && !newComp.IsPublic)
        {
            if (comp.StartDate > DateTime.Now || comp.EndDate < DateTime.Now)
            {
                return Task.CompletedTask;
            }
            throw new Exception("Can not make private after competitions start");
        }
        return Task.CompletedTask;
    }

    public Task NeedsQuestionAndTestCaseToBePublic(Competition competition, List<Question> questions)
    {
        if (competition.IsPublic)
        {
            if (questions.Count == 0)
                throw new Exception("Competition must have at least one question for public");

            questions.ForEach(q =>
            {
                if (q.TestCases.Count == 0)
                {

                    throw new Exception("The question \"" + q.Name + "\" must have at least one test case for public");
                }
            });
        }
        return Task.CompletedTask;
    }
}

