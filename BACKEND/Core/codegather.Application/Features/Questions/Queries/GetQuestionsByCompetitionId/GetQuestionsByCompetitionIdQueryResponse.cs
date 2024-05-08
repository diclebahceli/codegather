namespace codegather.Application;

public class GetQuestionsByCompetitionIdQueryResponse
{
    public ICollection<DetailedQuestionDto> Questions { get; set; } = new List<DetailedQuestionDto>();
}
