using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace codegather.Application
{
    public class GetAllCommentsHandler : BaseHandler, IRequestHandler<GetAllCommentsRequest, GetAllCommentsResponse>
    {
        UserManager<User> userManager;
        public GetAllCommentsHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor, UserManager<User> userManager) : base(mapper, unitOfWork, httpContextAccessor)
        {
            this.userManager = userManager;
        }


        async Task<GetAllCommentsResponse> IRequestHandler<GetAllCommentsRequest, GetAllCommentsResponse>.Handle(GetAllCommentsRequest request, CancellationToken cancellationToken)
        {
             
            var comments = await unitOfWork.GetReadRepository<Comment>()
                .GetAllAsync(predicate: c => !c.IsDeleted
                        , include: c => c.Include(c => c.User).Include(c => c.Question)
                        , enableTracking: false);

            if(request.QuestionId != null)
            {
                comments = comments.Where(c => c.QuestionId == request.QuestionId).ToList();
            }
            if(request.UserId != null)
            {
                comments = comments.Where(c => c.UserId == request.UserId).ToList();
            }

            mapper.AddConfig<UserDto, User>();
            mapper.AddConfig<QuestionDto, Question>();


            return new GetAllCommentsResponse
            {
                Comments = comments.Select(c => mapper.Map<CommentDto, Comment>(c)).ToList()
            };
        }
    }
}
