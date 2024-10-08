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
            User user = await _userManager.FindByNameAsync(request.UserName)
                ?? throw new Exception("User not found");


            var userCompetitions = await unitOfWork.GetReadRepository<UserCompetition>().GetAllAsync(
               predicate: c => !c.IsDeleted && c.UserId == user.Id,
               include: c => c.Include(c => c.Competition),
               enableTracking: false);

            var competitions = userCompetitions.Select(uc => uc.Competition).ToList();

            var submissions = await unitOfWork.GetReadRepository<Submission>().GetAllAsync(
                predicate: s => s.UserId == user.Id,
                enableTracking: false);


            return new GetUserByUsernameResponse
            {
                User = mapper.Map<UserDto, User>(user),
                Submissions = submissions.Select(s => mapper.Map<SubmissionDto, Submission>(s)).ToList(),
                Competitions = competitions.Select(c => mapper.Map<CompetitionDto, Competition>(c)).ToList()
            };

        }
    }
}
