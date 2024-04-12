using FluentValidation;

namespace codegather.Application;
public class UpdateCompetitionCommandValidator : AbstractValidator<UpdateCompetitionCommandRequest>
{
    public UpdateCompetitionCommandValidator()
    {
        RuleFor(x => x.Id).NotNull().WithMessage("Id must be valid");
        RuleFor(x => x.Title).NotEmpty().WithMessage("Title is required");
        RuleFor(x => x.Description).NotEmpty().WithMessage("Description is required");
        RuleFor(x => x.StartTime).NotEmpty().WithMessage("StartDate is required");
        RuleFor(x => x.StartTime).GreaterThan(DateTime.Now).WithMessage("StartDate must be after today");
        RuleFor(x => x.EndTime).GreaterThan(DateTime.Now).WithMessage("EndTime must be after today");
        RuleFor(x => x.EndTime).NotEmpty().WithMessage("EndDate is required");
        RuleFor(x => x.EndTime).GreaterThan(x => x.StartTime).WithMessage("EndTime must be after StartDate");
    }
}