using SmartTaskAPI.Models.DB;
using SmartTaskAPI.Models.DTO;

namespace SmartTaskAPI.Repository.Interface
{
    public interface IProjectMemberRepository
    {
        Task AddMemberAsync(int projectId, AddMemberDto dto, string currentUserId, string adderRole, string targetRole , int ProjectRoleId);
        Task RemoveMemberAsync(int projectId, string targetUserId ,string currentUserId , string CurrentUserRole , string targetUserRole);


        Task<List<ProjectMemberResponseDto>> GetAllMembersAsync(int projectId);

    }
}
