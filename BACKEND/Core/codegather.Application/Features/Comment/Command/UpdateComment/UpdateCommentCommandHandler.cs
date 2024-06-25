using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace codegather.Application
{
    public class UpdateCommentCommandHandler : BaseHandler, IRequestHandler<UpdateCommentCommandRequest, Unit>
    {
        UserManager<User> userManager;
        public UpdateCommentCommandHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor, UserManager<User> userManager) : base(mapper, unitOfWork, httpContextAccessor)
        {
            this.userManager = userManager;
        }

        public async Task<Unit> Handle(UpdateCommentCommandRequest request, CancellationToken cancellationToken)
        {
            var comment = await unitOfWork.GetReadRepository<Comment>()
                .GetAsync(predicate: c => c.Id == request.Id && !c.IsDeleted, enableTracking: true)
                ?? throw new Exception("Comment not found");

            comment.Content = request.Content;
            
            await unitOfWork.SaveAsync();


            return Unit.Value;
        }
    }
}
