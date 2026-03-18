using Microsoft.EntityFrameworkCore;
using SmartTaskAPI.Data;
using SmartTaskAPI.Models.DTO;
using SmartTaskAPI.Models.Identity;
using SmartTaskAPI.Repository.Interface;

namespace SmartTaskAPI.Repository.Implementation
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context) { 
            this._context = context;
        }

        public async Task<List<UserResponseDto>> GetAllAsync()
        {
            var users = await _context.Users
           .Select(u => new UserResponseDto
           {
               UserId = u.Id,
               FirstName = u.FirstName,
               LastName = u.LastName,// or FirstName
               Email = u.Email ?? "",
               Role = _context.UserRoles    
                   .Where(ur => ur.UserId == u.Id)
                   .Join(_context.Roles,
                       ur => ur.RoleId,
                       r => r.Id,
                       (ur, r) => r.Name)
                   .FirstOrDefault() ?? ""
           })
           .ToListAsync();

            return users;
        }
        public async Task<string> GetUserRoleAsync(string userId)
        {
            var role = await _context.UserRoles
                .Where(ur => ur.UserId == userId)
                .Join(_context.Roles,
                    ur => ur.RoleId,
                    r => r.Id,
                    (ur, r) => r.Name)
                .FirstOrDefaultAsync();

            return role ?? "";
        }

    }
}
