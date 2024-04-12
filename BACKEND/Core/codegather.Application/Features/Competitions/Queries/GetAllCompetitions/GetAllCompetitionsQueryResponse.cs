
namespace codegather.Application;
public class GetAllCompetitionsQueryResponse
{
    public ICollection<CompetitionDto> Competitions { get; set; } = new List<CompetitionDto>();

}
