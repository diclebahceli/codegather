namespace codegather.Domain
{
    public class Comment: EntityBase{
        public string Content { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
        public Guid QuestionId { get; set; }
        public Question Question { get; set; }
    }
}
