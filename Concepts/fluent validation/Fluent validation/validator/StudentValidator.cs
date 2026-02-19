using Fluent_validation.Models;
using FluentValidation;
using System.Data;

namespace Fluent_validation.validator
{
    public sealed class StudentValidator : AbstractValidator<Studentdto>
    {
        public StudentValidator()
        {
            RuleFor(e => e.email)
                .NotEmpty().WithMessage("Required")
                .EmailAddress().WithMessage("invalid email");

            RuleFor(e => e.password)
                .NotEmpty()
            .MinimumLength(8)
            .Matches("[A-Z]").WithMessage("Password must contain at least one uppercase letter.")
            .Matches("[a-z]").WithMessage("Password must contain at least one lowercase letter.")
            .Matches("[0-9]").WithMessage("Password must contain at least one digit.")
            .Matches("[^a-zA-Z0-9]").WithMessage("Password must contain at least one special character.");

            RuleFor(x => x.DOB)
            .Must(BeAtLeast18YearsOld)
            .WithMessage("You must be at least 18 years old.");




        }
        private static bool Beinpast(DateTime DOB)
        {
            return DOB < DateTime.Today;
        }
        
        


    private bool BeAtLeast18YearsOld(DateTime DOB)
        {
            return DateTime.Today.AddYears(-18) >= DOB.Date;
        }
    

    }
}

    