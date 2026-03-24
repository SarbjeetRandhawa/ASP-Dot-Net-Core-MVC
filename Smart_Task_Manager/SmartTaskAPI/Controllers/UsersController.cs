using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SmartTaskAPI.Models.Identity;
using SmartTaskAPI.Services.Interfaces;
using SmartTaskAPI.UnitOfWork;

namespace SmartTaskAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly UserManager<ApplicationUser> _userManager;

        public UsersController(IUserService userService , UserManager<ApplicationUser> userManager)
        {
            _userService = userService;
            _userManager = userManager;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllAsync();
            
            return Ok(users);
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserRoleAsync(string userId)
        {
            var user = await _userService.GetUserRoleAsync(userId);
            return Ok(user);
        }

        [HttpDelete("{userId}")]
        [Authorize(Roles = "Admin")]

        public async Task<IActionResult> DeleteUserByIdAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded) { 
                return BadRequest(result.Errors);
            }
            return Ok("Deleted");
        }

    }
}
