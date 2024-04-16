using codegather.Application;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace codegather.Api;


[Route("api/[controller]/[action]")]
[ApiController]

public class AuthController : ControllerBase
{
    private readonly IMediator mediator;

    public AuthController(IMediator mediator)
    {
        this.mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Register(RegisterCommandRequest request)
    {
        await mediator.Send(request);
        return StatusCode(StatusCodes.Status201Created);
    }

    [HttpPost]
    public async Task<IActionResult> Login(LoginCommandRequest request)
    {
        LoginCommandResponse response = await mediator.Send(request);
        return Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> Logout(LogoutCommandRequest request)
    {
        await mediator.Send(request);
        return Ok();
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> LogoutAll()
    {
        await mediator.Send(new LogoutAllCommandRequest());
        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> RefreshToken(RefreshTokenCommandRequest request)
    {
        RefreshTokenCommandResponse response = await mediator.Send(request);
        return Ok(response);
    }
}
