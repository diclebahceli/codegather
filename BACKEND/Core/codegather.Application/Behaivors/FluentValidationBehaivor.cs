using FluentValidation;
using MediatR;

namespace codegather.Application.Behaivors;
public class FluentValidationBehaivor<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
{
    private IEnumerable<IValidator<TRequest>> validators;

    public FluentValidationBehaivor(IEnumerable<IValidator<TRequest>> validators)
    {
        this.validators = validators;
        
    }
    public Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        var context = new ValidationContext<TRequest>(request);
        var failtures = validators
            .Select(v => v.Validate(context))
            .SelectMany(result => result.Errors)
            .GroupBy(f => f.ErrorMessage)
            .Select(f => f.First())
            .Where(f => f != null)
            .ToList();

            if(failtures.Any())
            {
                throw new ValidationException(failtures);
            }

            return next();
    }
}
