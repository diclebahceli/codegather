namespace codegather.Domain
{
    public class UserCompetition: EntityBase
    {
        public Guid UserId { get; set; }
        public User User { get; set; }

        public Guid CompetitionId { get; set; }
        public Competition Competition { get; set; }

        public double Score { get; set; }
    }
}
