using SmartTaskAPI.Models.DTO.ProjectDto;

namespace SmartTaskAPI.Services.Interfaces
{
    public interface IProjectService
    {
        Task CreateAsync(ProjectDto dto, string CreatoruserId);
        Task UpdateAsync(int id, ProjectDto dto, string CurrentUserId);
        Task DeleteProjectAsync(int id, string CurrentUserId);
        Task<List<ProjectResponseDto>> GetAllProjectsAsync(string userId);
        Task<bool> ArchiveProjectAsync(int id , string userId , string userRole);


        Task<ProjectDetailsResponseDto> GetProjectByIdAsync(int id);
        
    }
}
