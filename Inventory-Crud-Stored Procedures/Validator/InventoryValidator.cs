using FluentValidation;
using Inventory_Crud.Models;

namespace Inventory_Crud.Validator
{
    public sealed class InventoryValidator : AbstractValidator<Inventory>
    {
        public InventoryValidator(){

            RuleFor(x => x.CreatedDate)
            .NotEmpty().WithMessage("Start Date is required");

            RuleFor(x => x.ExpiryDate)
                .NotEmpty().WithMessage("Expiry Date is required");

            RuleFor(x => x)
                .Must(x => x.CreatedDate < x.ExpiryDate)
                .WithMessage("Start Date must be earlier than Expiry Date");
        }
        
    }
}
