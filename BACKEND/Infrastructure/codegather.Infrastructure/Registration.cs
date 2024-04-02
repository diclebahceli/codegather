using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace codegather.Infrastructure;

public static class Registration
{
    public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<TokenSettings>(configuration.GetSection("JWT"));
    }
}
