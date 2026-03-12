using System.ComponentModel.DataAnnotations;

namespace Inventory_Crud.Models.DTOs.Auth
{
    public class LoginDto
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]


        public string Email { get; set; }
        [Required(ErrorMessage = "Password is required")]

        public string Password { get; set; }
    }
}
