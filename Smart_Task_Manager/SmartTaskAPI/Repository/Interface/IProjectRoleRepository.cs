using SmartTaskAPI.Models.DB;
using SmartTaskAPI.Models.DTO;

namespace SmartTaskAPI.Repository.Interface
{
    public interface IProjectRoleRepository
    {
        Task<List<ProjectRoleDTO>> GetAllAsync();
        Task<ProjectRole> GetByIdAsync(int id);
    }
}
