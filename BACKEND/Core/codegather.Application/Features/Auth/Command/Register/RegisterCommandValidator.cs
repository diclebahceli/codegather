using FluentValidation;

namespace codegather.Application;

public class RegisterCommandValidator : AbstractValidator<RegisterCommandRequest>
{
    public RegisterCommandValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress()
            .WithMessage("Email is not valid");

        RuleFor(x => x.Email)
            .MaximumLength(60)
            .MinimumLength(8)
            .WithMessage("Email must be between 8 and 60 characters");

        RuleFor(x => x.UserName)
            .NotEmpty()
            .MaximumLength(15)
            .MinimumLength(5)
            .WithMessage("Username must be between 5 and 15 characters");

        RuleFor(x => x.Password)
            .NotEmpty()
            .MinimumLength(8)
            .WithName("Password")
            .WithMessage("Password must be at least 8 characters");

    }
}
