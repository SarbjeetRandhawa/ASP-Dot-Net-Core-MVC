using SmartTaskAPI.Models.DB;
using SmartTaskAPI.Models.DTO;

namespace SmartTaskAPI.Repository
{
    public interface IProjectMemberRepository
    {
        Task AddMemberAsync(int projectId, AddMemberDto dto, string currentUserId);
        Task RemoveMemberAsync(int projectId, string targetUserId ,string currentUserId);


        Task<List<ProjectMemberResponseDto>> GetAllMembersAsync(int projectId);

    }
}
