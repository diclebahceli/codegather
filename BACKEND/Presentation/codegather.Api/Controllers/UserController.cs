using codegather.Application;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace codegather.Api;

[Route("api/[controller]/[action]")]
[ApiController]
// [Authorize]
public class UserController : ControllerBase
{

    private readonly IMediator mediator;
    public UserController(IMediator mediator)
    {
        this.mediator = mediator;
    }


    [HttpGet]
    // [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAll()
    {
        var response = await mediator.Send(new GetAllUsersRequest());
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetById(GetUserByIdRequest request)
    {
        var response = await mediator.Send(request);
        return Ok(response);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateUser(UpdateUserCommandRequest request)
    {
        await mediator.Send(request);
        return Ok();
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteUser(DeleteUserRequest request)
    {
        await mediator.Send(request);
        return Ok();
    }

    [HttpPut]
    public async Task<IActionResult> JoinCompetition(JoinCompetitionQueryRequest request)
    {
        await mediator.Send(request);
        return Ok();
    }

}
