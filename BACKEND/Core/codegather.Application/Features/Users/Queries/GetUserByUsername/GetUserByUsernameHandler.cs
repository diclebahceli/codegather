using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SendGrid.Helpers.Errors.Model;

namespace codegather.Application
{
    public class GetUserByUsernameHandler :
        BaseHandler, IRequestHandler<GetUserByUserNameRequest, GetUserByUsernameResponse>
    {

        private UserManager<User> _userManager;

        public GetUserByUsernameHandler(IMapper mapper, IUnitOfWork unitOfWork
                , UserManager<User> userManager, IHttpContextAccessor httpContextAccessor)
            : base(mapper, unitOfWork, httpContextAccessor)
        {
            _userManager = userManager;
        }

        public async Task<GetUserByUsernameResponse> Handle(GetUserByUserNameRequest request, CancellationToken cancellationToken)
        {
            User user = await unitOfWork.GetReadRepository<User>()
                .GetAsync(predicate: u => u.UserName == request.UserName
                    , include: u => u.Include(u => u.Submissions.Where(s => !s.IsDeleted))
                    .Include(u => u.Competitions.Where(c => !c.IsDeleted)))
                ?? throw new NotFoundException("Couldn't find user with that username");

            return new GetUserByUsernameResponse
            {
                User = mapper.Map<UserDto, User>(user),
                Submissions = user.Submissions.Select(s => mapper.Map<SubmissionDto, Submission>(s)).ToList(),
                Competitions = user.Competitions.Select(c => mapper.Map<CompetitionDto, Competition>(c)).ToList()
            };

        }
    }
}
