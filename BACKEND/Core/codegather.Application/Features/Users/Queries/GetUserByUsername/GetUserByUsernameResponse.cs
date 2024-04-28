using codegather.Domain;

namespace codegather.Application
{
    public class GetUserByUsernameResponse
    {
        public UserDto User { get; set; }
        public ICollection<SubmissionDto> Submissions { get; set; } = new List<SubmissionDto>();
        public ICollection<CompetitionDto> Competitions { get; set; } = new List<CompetitionDto>();
    }
}
