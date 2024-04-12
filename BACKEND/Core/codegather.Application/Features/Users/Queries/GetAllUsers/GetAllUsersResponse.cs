using codegather.Domain;

namespace codegather.Application;
public class GetAllUsersResponse
{
    public ICollection<UserDto> Users { get; set; } = new List<UserDto>();

}
