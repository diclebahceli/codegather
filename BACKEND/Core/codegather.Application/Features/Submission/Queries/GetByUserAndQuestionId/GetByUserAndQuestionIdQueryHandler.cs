using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using SendGrid.Helpers.Errors.Model;

namespace codegather.Application;
public class GetByUserAndQuestionIdQueryHandler
    : BaseHandler, IRequestHandler<GetByUserAndQuestionIdQueryRequest, GetByUserAndQuestionIdQueryResponse>
{
    UserManager<User> userManager;
    public GetByUserAndQuestionIdQueryHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor, UserManager<User> userManager) : base(mapper, unitOfWork, httpContextAccessor)
    {
        this.userManager = userManager;
    }

    public async Task<GetByUserAndQuestionIdQueryResponse> Handle(GetByUserAndQuestionIdQueryRequest request, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByIdAsync(request.UserId.ToString()) ?? throw new NotFoundException("User not found");
        var question = await unitOfWork.GetReadRepository<Question>()
            .GetAsync(predicate: c => c.Id == request.QuestionId, enableTracking: false)
            ?? throw new NotFoundException("Question not found");

        var submissions = await unitOfWork.GetReadRepository<Submission>()
            .GetAllAsync(predicate: s => s.QuestionId == request.QuestionId
                    && s.UserId == request.UserId
                    && !s.IsDeleted, enableTracking: false)
            ?? new List<Submission>();


        return new GetByUserAndQuestionIdQueryResponse
        {
            Submissions = submissions.Select(s => mapper.Map<SubmissionDto, Submission>(s)).ToList()
        };

    }
}
