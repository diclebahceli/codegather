using FluentValidation;

namespace codegather.Application;
public class DeleteCompetitionCommandValidator : AbstractValidator<DeleteCompetitionCommandRequest>
{
    public DeleteCompetitionCommandValidator()
    {
        RuleFor(x => x.Id).NotNull().WithMessage("Id must be valid");
    }
}