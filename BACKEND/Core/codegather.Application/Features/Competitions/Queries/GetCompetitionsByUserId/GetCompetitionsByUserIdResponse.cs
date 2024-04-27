namespace codegather.Application
{
    public class GetCompetitionsByUserIdResponse
    {
        public ICollection<CompetitionDto> Competitions { get; set; } = new List<CompetitionDto>();
    }
}
