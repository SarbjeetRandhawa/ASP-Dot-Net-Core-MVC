using Microsoft.EntityFrameworkCore;
using SmartTaskAPI.Data;
using SmartTaskAPI.Models.DB;
using SmartTaskAPI.Models.DTO;
using SmartTaskAPI.Repository.Interface;

namespace SmartTaskAPI.Repository.Implementation
{
    public class ProjectRoleRepository : IProjectRoleRepository
    {
        private readonly AppDbContext _context;
        public ProjectRoleRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<ProjectRoleDTO>> GetAllAsync()
        {
            return await _context.projectRoles.Select(
                x => new ProjectRoleDTO
                {
                    Id = x.Id,
                    Name = x.Name
                }).ToListAsync();
        }

        public async Task<ProjectRole> GetByIdAsync(int id)
        {
            return await _context.projectRoles.FindAsync(id);
        }
    }
}
