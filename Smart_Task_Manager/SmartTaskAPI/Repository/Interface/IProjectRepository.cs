using SmartTaskAPI.Models.DB;
using SmartTaskAPI.Models.DTO;

namespace SmartTaskAPI.Repository.Interface
{
    public interface IProjectRepository
    {
        Task CreateProjectAsync(Project project);
        Task CreateProjectMemberAsync(List<ProjectMember> projectMembers);

        Task UpdateAsync(int id , CreateProjectDto dto , string CurrentUserId , string role);
        Task DeleteAsync(int id , string CurrentUserId, string role);
    }
}
