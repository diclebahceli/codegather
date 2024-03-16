using FluentValidation;

namespace codegather.Application;
public class DeleteCompetitionCommandValidator: AbstractValidator<DeleteCompetitionCommandRequest>
{
    public DeleteCompetitionCommandValidator()
    {
        RuleFor(x => x.Id).GreaterThan(0).WithMessage("Id must be valid");
    }
}