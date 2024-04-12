namespace codegather.Application;

public class GetAllQuestionsQueryResponse
{
    public ICollection<QuestionDto> Questions { get; set; } = new List<QuestionDto>();
}
