namespace codegather.Application
{
    public class GetByUserAndQuestionIdQueryResponse
    {
        public ICollection<SubmissionDto> Submissions { get; set; } = new List<SubmissionDto>();
    }
}
