using Microsoft.EntityFrameworkCore;
using SmartTaskAPI.Data;
using SmartTaskAPI.Models.DB;
using SmartTaskAPI.Models.DTO;

namespace SmartTaskAPI.Repository
{
    public class ProjectMemberRepository : IProjectMemberRepository
    {
        private readonly AppDbContext _Context;

        public ProjectMemberRepository(AppDbContext context)
        {
            this._Context = context;
        }

        public async Task AddMemberAsync(int projectId, AddMemberDto dto, string currentUserId)
        {
            //var currentMember = await _Context.ProjectMembers.
        }

        public Task<List<ProjectMembers>> GetAllMembersAsync(int projectId)
        {
            throw new NotImplementedException();
        }
    }
}
