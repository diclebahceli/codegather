using codegather.Application;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace codegather.Api;

[Route("api/[controller]/[action]")]
[ApiController]
public class CommentController : ControllerBase
{
    private IMediator mediator;

    public CommentController(IMediator mediator)
    {
        this.mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery]GetAllCommentsRequest request)
    {
        var response = await mediator.Send(request);
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetById([FromQuery] GetCommentByIdRequest request)
    {
        var response = await mediator.Send(request);
        return Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> CreateComment(CreateCommentCommandRequest request)
    {
        await mediator.Send(request);
        return Ok();
    }
    
    [HttpPut]
    public async Task<IActionResult> UpdateComment(UpdateCommentCommandRequest request)
    {
        await mediator.Send(request);
        return Ok();
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteComment([FromQuery] DeleteCommentCommandRequest request)
    {
        await mediator.Send(request);
        return Ok();
    }
}
