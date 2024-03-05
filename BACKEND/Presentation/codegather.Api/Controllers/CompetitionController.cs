using codegather.Application;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace codegather.Api;

[Route("api/[controller]/[action]")]
[ApiController]
public class CompetitionController : ControllerBase
{
    private IMediator mediator;

    public CompetitionController(IMediator mediator)
    {
        this.mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var response = await mediator.Send(new GetAllCompetitionsQueryRequest());
        return Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> CreateCompetition(CreateCompetitionCommandRequest request)
    {
        await mediator.Send(request);
        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> UpdateCompetition(UpdateCompetitionCommandRequest request)
    {
        await mediator.Send(request);
        return Ok();
    }


}
