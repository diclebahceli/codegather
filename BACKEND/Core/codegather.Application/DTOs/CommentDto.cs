using codegather.Domain;

namespace codegather.Application
{
    public class CommentDto
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public UserDto User { get; set; }
        public QuestionDto Question { get; set; }
    }
}
