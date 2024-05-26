using System.Reflection;
using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace codegather.Application;

public class RegisterCommandHandler : BaseHandler, IRequestHandler<RegisterCommandRequest, Unit>
{
    private readonly AuthRules authRules;
    private readonly UserManager<User> userManager;
    private readonly RoleManager<Role> roleManager;
    public RegisterCommandHandler(AuthRules authRules,
            UserManager<User> userManager,
            RoleManager<Role> roleManager, IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
        this.authRules = authRules;
        this.userManager = userManager;
        this.roleManager = roleManager;
    }

    public async Task<Unit> Handle(RegisterCommandRequest request, CancellationToken cancellationToken)
    {
        await authRules.UserShouldNotExists(await userManager.FindByEmailAsync(request.Email));
        User user = new()
        {
            Email = request.Email,
            UserName = request.UserName,
            SecurityStamp = Guid.NewGuid().ToString(),
            ProfileImage = GetDefaultProfileImage()

        };
        IdentityResult result = await userManager.CreateAsync(user, request.Password);
        if (result.Succeeded)
        {
            if (!await roleManager.RoleExistsAsync("User"))
            {
                await roleManager.CreateAsync(new Role
                {
                    Id = Guid.NewGuid(),
                    Name = "User",
                    NormalizedName = "USER",
                    ConcurrencyStamp = Guid.NewGuid().ToString()

                });
            }
            await userManager.AddToRoleAsync(user, "User");
        }
        return Unit.Value;
    }

    //TODO
    private byte[] GetDefaultProfileImage()
    {
        // Get the namespace of the current assembly
        string nameSpace = typeof(RegisterCommandHandler).Namespace;

        // Build the resource name
        string resName = $"{nameSpace}.Resource.pp.png";

        // Get the assembly that contains the embedded resource
        var assembly = typeof(RegisterCommandHandler).Assembly;

        // Get the embedded resource stream
        var names = assembly.GetManifestResourceNames();
        using (Stream stream = assembly.GetManifestResourceStream(resName))
        {
            if (stream == null)
            {
                // Handle the case where the resource is not found
                throw new InvalidOperationException("Default profile picture resource not found");
            }

            // Read the stream into a byte array
            byte[] bytes = new byte[stream.Length];
            stream.Read(bytes, 0, bytes.Length);

            return bytes;
        }
    }
}
