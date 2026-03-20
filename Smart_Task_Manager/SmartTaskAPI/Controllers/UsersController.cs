using Microsoft.AspNetCore.Mvc;
using SmartTaskAPI.Services.Interfaces;
using SmartTaskAPI.UnitOfWork;

namespace SmartTaskAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
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
        
    }
}
