using SmartTaskAPI.Models.DB;
using SmartTaskAPI.Models.DTO;

namespace SmartTaskAPI.Repository
{
    public interface IProjectRepository
    {
        Task CreateAsync(CreateProjectDto dto , string userId , string role);
        Task UpdateAsync(int id , CreateProjectDto dto , string role);
        Task DeleteAsync(int id , string role);
    }
}
