using System.Security.Claims;
using codegather.Application.Interfaces.AutoMapper;
using Microsoft.AspNetCore.Http;

namespace codegather.Application;

public class BaseHandler
{
    public readonly IMapper mapper;
    public readonly IUnitOfWork unitOfWork;
    public readonly IHttpContextAccessor httpContextAccessor;
    public readonly string userId;

    public BaseHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor)
    {
        this.mapper = mapper;
        this.unitOfWork = unitOfWork;
        this.httpContextAccessor = httpContextAccessor;
        this.userId = httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
    }
}
