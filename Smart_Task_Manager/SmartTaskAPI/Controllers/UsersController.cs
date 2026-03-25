using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SmartTaskAPI.Models.Identity;
using SmartTaskAPI.Services.Interfaces;
using SmartTaskAPI.UnitOfWork;
using System.Security.Claims;

namespace SmartTaskAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IProjectMemberService _projectMemberService;

        public UsersController(IUserService userService , UserManager<ApplicationUser> userManager , IProjectMemberService projectMemberService)
        {
            _userService = userService;
            _userManager = userManager;
            _projectMemberService = projectMemberService;
        }

        private string GetUserId()
        {
            return User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
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
            if (userId == GetUserId())
            {
                return BadRequest(new {message = "Cannot Delete Yourself" });
            }
            
          
            await _userService.DeleteUserWithProjectRelationAsync(userId);
            
            var user = await _userManager.FindByIdAsync(userId);

            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded) { 
                return BadRequest(result.Errors);
            }
            return Ok("Deleted");
        }

    }
}
