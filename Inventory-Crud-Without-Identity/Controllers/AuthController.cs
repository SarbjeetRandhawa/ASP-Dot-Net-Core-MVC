using BCrypt.Net;
using Inventory_Crud.Models.DataBases;
using Inventory_Crud.Models.Domain;
using Inventory_Crud.Models.DTOs.Auth;
using Inventory_Crud.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Inventory_Crud.Controllers
{
    public class AuthController : Controller
    {
        private readonly InventoryDbContext _context;
        private readonly JwtTokenService _jwtTokenService;

        public AuthController(InventoryDbContext context, JwtTokenService jwtTokenService)
        {
            _context = context;
            _jwtTokenService = jwtTokenService;
        }

        public IActionResult Register()
        {
            return View();
        }



        [HttpPost]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            if (!ModelState.IsValid)
            {
                return View(dto);
            }

            bool exist = _context.Users.Any(u => u.Email == dto.Email);
            if (exist)
            {
                ModelState.AddModelError("Email", "Email already exists");
                return View(dto);
            }

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            var user = new Users
            {
                Email = dto.Email,
                PasswordHash = passwordHash
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return RedirectToAction("Login");
        }


        public IActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Login(LoginDto dto)
        {

            if (!ModelState.IsValid)
            {
                return View(dto);
            }

            var user = _context.Users.FirstOrDefault(u => u.Email == dto.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            {
                ModelState.AddModelError("Email", "Invalid email or password");
                return View(dto);
            }

            string token = _jwtTokenService.Generatetoken(user);
            // Store the token in a cookie
            Response.Cookies.Append("jwt", token);
            return RedirectToAction("Index", "Home");
        }
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            return RedirectToAction("Login");

        } 
        public IActionResult Test()
        {
            return Content(User.Identity.IsAuthenticated.ToString());
        }
    }

    
}
