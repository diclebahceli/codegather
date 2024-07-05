using MediatR;

namespace codegather.Application
{
    public class GetCommentByIdRequest: IRequest<GetCommentByIdResponse>
    {
        public Guid CommentId { get; set; }
    }
}
