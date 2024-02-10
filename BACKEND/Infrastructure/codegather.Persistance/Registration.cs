using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace codegather.Persistance;
public static class Registration
{
    public static void AddPersistance(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<AppDbContext>(options =>
        {
            options.UseSqlite(configuration.GetConnectionString("LiteConnection"));
        });
        // services.AddScoped<IUnitOfWork, UnitOfWork>();
        // services.AddScoped<ICompetitionRepository, CompetitionRepository>();
        // services.AddScoped<IQuestionRepository, QuestionRepository>();
        // services.AddScoped<ISubmissionRepository, SubmissionRepository>();
    }
}
