using MediatR;

namespace codegather.Application
{
    public class GetAllCommentsRequest: IRequest<GetAllCommentsResponse>
    {
        public Guid? QuestionId { get; set; }
        public Guid? UserId { get; set; }
    }
}
