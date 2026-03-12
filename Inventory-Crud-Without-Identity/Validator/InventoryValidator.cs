using FluentValidation;
using Inventory_Crud.Models.DataBases;
using Inventory_Crud.Models.DTOs;

namespace Inventory_Crud.Validator
{
    public sealed class InventoryValidator : AbstractValidator<CreateViewDto>
    {
        public InventoryValidator()
        {
            RuleFor(x => x.CreatedDate)
            .NotEmpty().WithMessage("Start Date is required")
            .LessThanOrEqualTo(DateTime.Today).WithMessage("Date must not be greater then present date");

            RuleFor(x => x.ExpiryDate)
                .NotEmpty().WithMessage("Expiry Date is required");

            RuleFor(x => x)
                .Must(x => x.CreatedDate < x.ExpiryDate)
                .WithMessage("Start Date must be earlier than Expiry Date");
           

        }
    }
}
