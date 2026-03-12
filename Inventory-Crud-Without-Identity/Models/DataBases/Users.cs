using System.ComponentModel.DataAnnotations;

namespace Inventory_Crud.Models.DataBases
{
    public class Users
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
       

        public string Email { get; set; }
        [Required(ErrorMessage = "Password is required")]

        public string PasswordHash { get; set; }
    }
}
