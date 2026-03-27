using SmartTaskAPI.Models.DTO;

namespace SmartTaskAPI.Services.Interfaces
{
    public interface IProjectService
    {
        Task CreateAsync(ProjectDto dto, string CreatoruserId);
        Task UpdateAsync(int id, ProjectDto dto, string CurrentUserId);
        Task DeleteProjectAsync(int id, string CurrentUserId);
        Task<List<ProjectResponseDto>> GetAllProjectsAsync(string userId);
        
    }
}
