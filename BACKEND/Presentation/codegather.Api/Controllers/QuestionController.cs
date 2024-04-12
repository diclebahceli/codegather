using codegather.Application;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace codegather.Api;
[Route("api/[controller]/[action]")]
[ApiController]
public class QuestionController: ControllerBase
{
    private readonly IMediator mediator;

    public QuestionController(IMediator mediator)
    {
        this.mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var response = await mediator.Send(new GetAllQuestionsQueryRequest());
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetById(GetQuestionByIdQueryRequest request)
    {
        var response = await mediator.Send(request);
        return Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> CreateQuestion(CreateQuestionCommandRequest request)
    {
        await mediator.Send(request);
        return Ok();
    }

    [HttpPut]
    public async Task<IActionResult> UpdateQuestion(UpdateQuestionCommandRequest request)
    {
        await mediator.Send(request);
        return Ok();
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteQuestion([FromQuery]DeleteQuestionCommandRequest request)
    {
        await mediator.Send(request);
        return Ok();
    }
}
