using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using SendGrid.Helpers.Errors.Model;

namespace codegather.Application;
public class GetLastSubmissionQueryHander : BaseHandler, IRequestHandler<GetLastSubmissionQueryRequest, GetLastSubmissionQueryResponse>
{
    UserManager<User> userManager;
    public GetLastSubmissionQueryHander(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor, UserManager<User> userManager) : base(mapper, unitOfWork, httpContextAccessor)
    {
        this.userManager = userManager;
    }

    public async Task<GetLastSubmissionQueryResponse> Handle(GetLastSubmissionQueryRequest request, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByIdAsync(request.UserId.ToString()) ?? throw new NotFoundException("User not found");
        var question = await unitOfWork.GetReadRepository<Question>()
            .GetAsync(predicate: c => c.Id == request.QuestionId, enableTracking: false)
            ?? throw new NotFoundException("Question not found");

        var submissions = await unitOfWork.GetReadRepository<Submission>()
            .GetAllAsync(predicate: s => s.UserId == request.UserId 
                    && s.QuestionId == request.QuestionId 
                    && !s.IsDeleted, enableTracking: false, orderBy: s => s.OrderByDescending(s => s.LastModified));

        var last = submissions.FirstOrDefault();

        return new GetLastSubmissionQueryResponse
        {
            Submission = last == null ? null : mapper.Map<SubmissionDto, Submission>(last)
        };
    }
}
