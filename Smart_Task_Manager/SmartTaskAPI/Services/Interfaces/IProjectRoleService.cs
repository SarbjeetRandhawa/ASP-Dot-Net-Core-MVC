using SmartTaskAPI.Models.DB;
using SmartTaskAPI.Models.DTO.ProjectDto;

namespace SmartTaskAPI.Services.Interfaces
{
    public interface IProjectRoleService
    {
        Task<List<ProjectRoleDTO>> GetAllAsync();
        Task<ProjectRole> GetByIdAsync(int id);
    }
}
