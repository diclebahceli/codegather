using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using codegather.Domain;
using codegather.Application.Interfaces.AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace codegather.Application.Features;
public class GetUserByIdHandler : BaseHandler, IRequestHandler<GetUserByIdRequest, GetUserByIdResponse>
{

    UserManager<User> userManager;

    public GetUserByIdHandler(UserManager<User> userManager, IMapper mapper, IUnitOfWork unitOfWork
            , IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
        this.userManager = userManager;
    }


    public async Task<GetUserByIdResponse> Handle(GetUserByIdRequest request, CancellationToken cancellationToken)
    {
        User user = await userManager.FindByIdAsync(request.Id.ToString())
            ?? throw new Exception("User not found");

        var competitions = await unitOfWork.GetReadRepository<Competition>().GetAllAsync(
            predicate: c => c.JoinedUsers.Any(u => u.Id == user.Id),
            enableTracking: false);

        var submissions = await unitOfWork.GetReadRepository<Submission>().GetAllAsync(
            predicate: s => s.UserId == user.Id,
            enableTracking: false);


        return new GetUserByIdResponse
        {
            User = mapper.Map<UserDto, User>(user),
            Competitions = competitions.Select(c => mapper.Map<CompetitionDto, Competition>(c)).ToList(),
            Submissions = submissions.Select(s => mapper.Map<SubmissionDto, Submission>(s)).ToList()
        };

    }
}
