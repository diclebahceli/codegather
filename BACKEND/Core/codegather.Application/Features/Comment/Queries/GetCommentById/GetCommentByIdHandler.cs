using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace codegather.Application
{
    public class GetCommentByIdHandler : BaseHandler, IRequestHandler<GetCommentByIdRequest, GetCommentByIdResponse>
    {
        UserManager<User> userManager;
        public GetCommentByIdHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor, UserManager<User> userManager) : base(mapper, unitOfWork, httpContextAccessor)
        {
            this.userManager = userManager;
        }


        async Task<GetCommentByIdResponse> IRequestHandler<GetCommentByIdRequest, GetCommentByIdResponse>.Handle(GetCommentByIdRequest request, CancellationToken cancellationToken)
        {
            var comment = await unitOfWork.GetReadRepository<Comment>()
                .GetAsync(predicate: c => !c.IsDeleted && c.Id == request.CommentId
                        , include: c => c.Include(c => c.User).Include(c => c.Question)
                        , enableTracking: false) ?? throw new Exception("Comment not found");

            mapper.AddConfig<UserDto, User>();
            mapper.AddConfig<QuestionDto, Question>();


            return new GetCommentByIdResponse
            {
                Comment = mapper.Map<CommentDto, Comment>(comment)
            };
        }
    }

}
