using SmartTaskAPI.Models.DB;
using SmartTaskAPI.Models.DTO;

namespace SmartTaskAPI.Repository.Interface
{
    public interface IProjectRepository
    {
        Task CreateProjectAsync(Projects project);
        Task CreateProjectMemberAsync(ProjectMembers projectMember);

        Task UpdateAsync(int id , CreateProjectDto dto , string CurrentUserId , string role);
        Task DeleteAsync(int id , string CurrentUserId, string role);
    }
}
