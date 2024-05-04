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
        User user = await unitOfWork.GetReadRepository<User>().GetAsync(predicate: u => u.Id == request.Id
                , include: u => u.Include(u => u.Submissions.Where(s => !s.IsDeleted))
                .Include(u => u.Competitions.Where(c => !c.IsDeleted)))
            ?? throw new Exception("User not found");

        return new GetUserByIdResponse
        {
            User = mapper.Map<UserDto, User>(user),
            Competitions = user.Competitions.Select(c => mapper.Map<CompetitionDto, Competition>(c)).ToList(),
            Submissions = user.Submissions.Select(s => mapper.Map<SubmissionDto, Submission>(s)).ToList()
        };

    }
}
