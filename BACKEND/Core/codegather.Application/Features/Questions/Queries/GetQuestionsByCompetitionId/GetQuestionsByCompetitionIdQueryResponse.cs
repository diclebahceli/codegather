namespace codegather.Application;

public class GetQuestionsByCompetitionIdQueryResponse
{
    public ICollection<QuestionDto> Questions { get; set; } = new List<QuestionDto>();
}
