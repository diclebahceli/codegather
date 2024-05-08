using codegather.Domain;

namespace codegather.Application
{
    public class UserRules: BaseRules
    {
        public Task CannotJoinEndedCompetition(Competition competition)
        {
            if (competition.EndDate < DateTime.Now)
                throw new Exception("Competition already ended");
            return Task.CompletedTask;
        }     
    }
}
