using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace codegather.Application
{
    public class DeleteCommentCommandHandler : BaseHandler, IRequestHandler<DeleteCommentCommandRequest, Unit>
    {
        UserManager<User> userManager;
        public DeleteCommentCommandHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor, UserManager<User> userManager) : base(mapper, unitOfWork, httpContextAccessor)
        {
            this.userManager = userManager;
        }

        public async Task<Unit> Handle(DeleteCommentCommandRequest request, CancellationToken cancellationToken)
        {
            var comment = await unitOfWork.GetReadRepository<Comment>()
                .GetAsync(predicate: c => c.Id == request.Id && !c.IsDeleted, enableTracking: true)
                ?? throw new Exception("Comment not found");

            comment.IsDeleted = true; 
            await unitOfWork.SaveAsync();


            return Unit.Value;
        }
    }
}
