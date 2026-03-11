using Microsoft.AspNetCore.Identity;

namespace Inventory_Crud.Models.Domain
{
    // InventoryUser now inherits from IdentityUser which satisfies the IdentityDbContext<TUser> constraint.
    public class InventoryUser : IdentityUser
    {
        // Add custom user properties here if needed, e.g.:
        // public string? FullName { get; set; }
    }
}