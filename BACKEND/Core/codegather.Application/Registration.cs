using System.Reflection;
using Microsoft.Extensions.DependencyInjection;

namespace codegather.Application;
public static class Registration
{
    public static void AddApplication(this IServiceCollection services)
    {
        var assembly = Assembly.GetExecutingAssembly();

        services.AddTransient<ExceptionMiddleware>();
        // Register all services from the executing ( current ) assembly
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(assembly));
    }
}
