using FluentValidation;
using Microsoft.AspNetCore.Http;
using SendGrid.Helpers.Errors.Model;
namespace codegather.Application;

public class ExceptionMiddleware : IMiddleware
{
    public async Task InvokeAsync(HttpContext httpContext, RequestDelegate next)
    {
        try
        {
            await next(httpContext);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(httpContext, ex);
        }

    }
    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        int statusCode = GetStatusCode(exception);
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = statusCode;

        if (exception.GetType() == typeof(ValidationException))
        {
            return context.Response.WriteAsync(new ExceptionModel
            {
                Errors = ((ValidationException)exception).Errors.Select(f => f.ErrorMessage),
                StatusCode = StatusCodes.Status400BadRequest
            }.ToString());
        }

        List<string> errors = new()
            {
                {exception.Message},
            };

        if(exception is ValidationException validationException)
        {
            errors = validationException.Errors.Select(e => e.ErrorMessage).ToList();
        }


        return context.Response.WriteAsync(new ExceptionModel
        {
            Errors = errors,
            StatusCode = statusCode
        }.ToString());

    }

    private static int GetStatusCode(Exception exception) =>
        exception switch
        {
            BadRequestException => StatusCodes.Status400BadRequest,
            NotFoundException => StatusCodes.Status404NotFound,
            ValidationException => StatusCodes.Status422UnprocessableEntity,
            _ => StatusCodes.Status500InternalServerError
        };

}
