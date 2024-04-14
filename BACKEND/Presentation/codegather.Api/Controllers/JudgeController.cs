using codegather.Application;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace codegather.Api;

[Route("api/[controller]/[action]")]
[ApiController]
public class JudgeController : ControllerBase
{
    private IMediator mediator;

    public JudgeController(IMediator mediator)
    {
        this.mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Submit(JudgeSubmitCommandRequest request)
    {
        await mediator.Send(request);
        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> GetResultByToken([FromQuery] GetResultByTokenQueryRequest request)
    {
        var response = await mediator.Send(request);
        return Ok(response);
    }
}
