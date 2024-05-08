using codegather.Application;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace codegather.Api;

[Route("api/[controller]/[action]")]
[ApiController]
public class SubmissionController : ControllerBase
{
    private IMediator mediator;

    public SubmissionController(IMediator mediator)
    {
        this.mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Submit(SubmitCommandRequest request)
    {
        var response = await mediator.Send(request);
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetResultByToken([FromQuery] GetResultByTokenQueryRequest request)
    {
        var response = await mediator.Send(request);
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetSubmissionsByQuestionId([FromQuery] GetSubmissionsByQuestionIdQueryRequest request)
    {
        var response = await mediator.Send(request);
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetSubmissionById([FromQuery] GetSubmissionByIdQueryRequest request)
    {
        var response = await mediator.Send(request);
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllSubmissions()
    {
        var response = await mediator.Send(new GetAllSubmissionsQueryRequest());
        return Ok(response);
    }
}
