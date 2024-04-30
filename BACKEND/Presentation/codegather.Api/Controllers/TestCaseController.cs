using codegather.Application;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace codegather.Api;

public class TestCaseController : ControllerBase
{
    private readonly IMediator mediator;

    public TestCaseController(IMediator mediator)
    {
        this.mediator = mediator;
    }


    [HttpGet]
    public async Task<IActionResult> GetById([FromQuery] GetTestCaseByIdQueryRequest request)
    {
        var response = await mediator.Send(request);
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetByQuestionId([FromQuery] GetTestCaseByQuestionIdQueryRequest request)
    {
        var response = await mediator.Send(request);
        return Ok(response);
    }


    [HttpPost]
    public async Task<IActionResult> CreateTestCase(CreateTestCaseCommandRequest request)
    {
        var response = await mediator.Send(request);
        return Ok(response);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateTestCase(UpdateTestCaseCommandRequest request)
    {
        var response = await mediator.Send(request);
        return Ok(response);
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteTestCase([FromQuery] DeleteTestCaseCommandRequest request)
    {
        var response = await mediator.Send(request);
        return Ok(response);
    }




}
