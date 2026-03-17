using SmartTaskAPI.Models.DB;
using SmartTaskAPI.Models.DTO;

namespace SmartTaskAPI.Repository
{
    public interface IProjectMemberRepository
    {
        Task AddMemberAsync(int projectId, AddMemberDto dto, string currentUserId);

       Task<List<ProjectMembers>> GetAllMembersAsync(int projectId);

    }
}
