using SmartTaskAPI.Models.DB;
using SmartTaskAPI.Models.DTO;

namespace SmartTaskAPI.Repository.Interface
{
    public interface IProjectRepository
    {

        
        Task<List<ProjectResponseDto>> GetAllProjectsAsync(string userId);

        Task CreateProjectAsync(Project project);
        Task CreateProjectMemberAsync(List<ProjectMember> projectMembers);

        Task UpdateAsync(int id , ProjectDto dto , string CurrentUserId , string role);
        Task DeleteAsync(int id , string CurrentUserId, string role);
    }
}
