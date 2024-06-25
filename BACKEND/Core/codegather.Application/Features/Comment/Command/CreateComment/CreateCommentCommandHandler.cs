using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace codegather.Application
{
    public class CreateCommentCommandHandler : BaseHandler, IRequestHandler<CreateCommentCommandRequest, Unit>
    {
        UserManager<User> userManager;
        public CreateCommentCommandHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor, UserManager<User> userManager) : base(mapper, unitOfWork, httpContextAccessor)
        {
            this.userManager = userManager;
        }

        public async Task<Unit> Handle(CreateCommentCommandRequest request, CancellationToken cancellationToken)
        {
            var user = await userManager.FindByIdAsync(request.UserId.ToString())
                ?? throw new Exception("User not found");

            var question = await unitOfWork.GetReadRepository<Question>()
                .GetAsync(predicate: q => q.Id == request.QuestionId && !q.IsDeleted)
                ?? throw new Exception("Question not found");

            var comment = mapper.Map<Comment, CreateCommentCommandRequest>(request);

            await unitOfWork.GetWriteRepository<Comment>().AddAsync(comment);
            await unitOfWork.SaveAsync();


            return Unit.Value;
        }
    }
}
