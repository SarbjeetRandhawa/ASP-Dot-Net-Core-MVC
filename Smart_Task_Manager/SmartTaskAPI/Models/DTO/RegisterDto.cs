using System.ComponentModel.DataAnnotations;

namespace SmartTaskAPI.Models.DTO
{
    public class RegisterDto
    {
        [Required(ErrorMessage = "First name is required")]
        

        public string FirstName { get; set; }
        [Required(ErrorMessage = "Last name is required")]
      
        public string LastName { get; set; }
        [Required(ErrorMessage = "Email is required")]
        
        public string Email { get; set; }
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
        [Required(ErrorMessage = "Confirm password is required")]
        
        public string ConfirmPassword { get; set; }
        [Required(ErrorMessage = "Role is required")]
        public string Role { get; set; }
    }
}
