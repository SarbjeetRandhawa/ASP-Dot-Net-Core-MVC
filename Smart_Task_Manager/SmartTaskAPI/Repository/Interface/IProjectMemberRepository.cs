using SmartTaskAPI.Models.DB;
using SmartTaskAPI.Models.DTO;
using SmartTaskAPI.Models.DTO.ProjectDto;

namespace SmartTaskAPI.Repository.Interface
{
    public interface IProjectMemberRepository
    {
        Task AddMemberAsync(int projectId, AddMemberDto dto, string currentUserId, string adderRole, string targetRole , int ProjectRoleId);
        Task RemoveMemberAsync(int projectId, string targetUserId ,string currentUserId , string CurrentUserRole , string targetUserRole);


        Task<List<ProjectMemberDto>> GetAllMembersAsync(int projectId);

    }
}
