using FluentValidation;
using MediatR;

namespace codegather.Application;

public class FluentValidationBehaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse> where TRequest : IRequest<TResponse>
{
    private readonly IEnumerable<IValidator<TRequest>> validators;
    public FluentValidationBehaviour(IEnumerable<IValidator<TRequest>> validators)
    {
        this.validators = validators;
    }
    public Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        var context = new ValidationContext<TRequest>(request);
        var failures = validators
            .Select(v => v.Validate(context))
            .SelectMany(result => result.Errors)
            .GroupBy(x => x.ErrorMessage)
            .Select(x => x.First())
            .Where(f => f != null)
            .ToList();


        if (failures.Any())
        {
            throw new ValidationException(failures);
        }

        return next();
    }
}
