using codegather.Domain;

namespace codegather.Application;

public class GetCompetitionByIdQueryResponse
{
    public CompetitionDto Competition { get; set; } = new CompetitionDto();
    public ICollection<QuestionDto> Questions { get; set; } = new List<QuestionDto>();
    public ICollection<UserScoreDto> JoinedUsers { get; set; } = new List<UserScoreDto>();
}
