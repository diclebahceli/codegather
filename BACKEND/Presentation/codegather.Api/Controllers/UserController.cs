using codegather.Application;
using MediatR;
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
    public async Task<IActionResult> GetById([FromQuery] GetUserByIdRequest request)
    {
        var response = await mediator.Send(request);
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetByUsername([FromQuery] GetUserByUserNameRequest request)
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
    public async Task<IActionResult> DeleteUser([FromQuery] DeleteUserRequest request)
    {
        await mediator.Send(request);
        return Ok();
    }

    [HttpPut]
    public async Task<IActionResult> JoinCompetition(JoinCompetitionCommandRequest request)
    {
        await mediator.Send(request);
        return Ok();
    }


    [HttpGet]
    public async Task<IActionResult> GetAllRoles()
    {
        var response = await mediator.Send(new GetAllRolesQueryRequest());
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetUserRole([FromQuery] GetUserRoleQueryRequest request)
    {
        var response = await mediator.Send(request);
        return Ok(response);
    }


    [HttpPut]
    public async Task<IActionResult> SetUserRole(SetUserRoleCommandRequest request)
    {
        var response = await mediator.Send(request);
        return Ok(response);
    }

}
