using SmartTaskAPI.Models.DTO;

namespace SmartTaskAPI.Services.Interfaces
{
    public interface IProjectService
    {
        Task CreateAsync(CreateProjectDto dto, string CreatoruserId, string role);
        Task UpdateAsync(int id, CreateProjectDto dto, string CurrentUserId);
        Task DeleteProjectAsync(int id, string CurrentUserId);
    }
}
