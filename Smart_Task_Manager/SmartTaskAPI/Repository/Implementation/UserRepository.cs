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

        public async Task DeleteUserWithProjectRelationAsync(string userId)
        {
            var projectMembers = _context.ProjectMembers.Where(pm=>pm.UserId == userId);
             _context.RemoveRange(projectMembers);
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
                   .FirstOrDefault() ?? "",
               ProjectCount = _context.ProjectMembers.Count(pm => pm.UserId == u.Id),
               JoinedAt = u.JoinedAt,
               LastActiveAt = u.LastActiveAt
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

        public async Task<List<ApplicationUser>> SearchUserAsync(string query)
        {
            return await _context.Users.Where(u => u.FirstName.Contains(query) ||  u.LastName.Contains(query)).Take(5).ToListAsync();
        }
    }
}
