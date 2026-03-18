using SmartTaskAPI.Models.DTO;

namespace SmartTaskAPI.Services.Interfaces
{
    public interface IProjectMemberService
    {
        Task AddMemberAsync(int projectId, AddMemberDto dto, string currentUserId ,int ProjectRoleId);
        Task RemoveMemberAsync(int projectId, string targetUserId, string currentUserId);


        Task<List<ProjectMemberResponseDto>> GetAllMembersAsync(int projectId);
    }
}
