using System.Reflection;
using codegather.Application.Behaivors;
using FluentValidation;
using MediatR;
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
        services.AddValidatorsFromAssembly(assembly);
        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(FluentValidationBehaivor<,>));
    }
}
