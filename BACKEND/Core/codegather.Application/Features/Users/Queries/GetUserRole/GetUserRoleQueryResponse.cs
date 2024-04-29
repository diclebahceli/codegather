using codegather.Domain;

namespace codegather.Application;

public class GetUserRoleQueryResponse
{
    public ICollection<string> Roles { get; set; }
}
