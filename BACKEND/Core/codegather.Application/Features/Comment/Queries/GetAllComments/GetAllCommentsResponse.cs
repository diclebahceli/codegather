namespace codegather.Application
{
    public class GetAllCommentsResponse
    {
        public ICollection<CommentDto> Comments { get; set; } = new List<CommentDto>();
    }
}
