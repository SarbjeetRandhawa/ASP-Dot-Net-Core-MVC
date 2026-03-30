using SmartTaskAPI.Models.DTO;
using SmartTaskAPI.Models.DTO.ProjectDto;

namespace SmartTaskAPI.Services.Interfaces
{
    public interface IProjectMemberService
    {
        Task AddMemberAsync(int projectId, AddMemberDto dto, string currentUserId ,int ProjectRoleId);
        Task RemoveMemberAsync(int projectId, string targetUserId, string currentUserId);


        Task<List<ProjectMemberDto>> GetAllMembersAsync(int projectId);
    }
}
