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
            var current = await _Context.ProjectMembers.FirstOrDefaultAsync(x => x.UserId == currentUserId && x.ProjectId == projectId);
            if (current == null) throw new Exception("not part of the project");

            if (current.Role == "Employee") throw new Exception("Not Allowed");

            if (current.Role == "Manager" && dto.Role == "Admin") throw new Exception("Manager cannot add Admin");

            var exists = await _Context.ProjectMembers.AnyAsync(x => x.UserId == dto.UserId && x.ProjectId == projectId);

            if (exists) {
                throw new Exception("Member already added");
            }

            var member = new ProjectMembers
            {
                UserId = dto.UserId,
                ProjectId = projectId,
                Role = dto.Role,
                

            };
            await _Context.ProjectMembers.AddAsync(member);
        }
        
        public async Task<List<ProjectMemberResponseDto>> GetAllMembersAsync(int projectId)
        {
            var members = await _Context.ProjectMembers.Where(pm =>  pm.ProjectId == projectId)
                .Join(_Context.Users , pm => pm.UserId , u=>u.Id, (pm, u) => new ProjectMemberResponseDto
                {
                    UserId=pm.UserId,
                    FirstName=u.FirstName,
                    LastName=u.LastName,
                    Email=u.Email,
                    Role=pm.Role

                }).ToListAsync();
            return members;
        }

        public async Task RemoveMemberAsync(int projectId, string targetUserId, string currentUserId)
        {
            var current = await _Context.ProjectMembers.FirstOrDefaultAsync(x => x.ProjectId == projectId && x.UserId == currentUserId);
            if (current == null)
            {
                throw new Exception("Not Part of the Project");
            }
            var target = await _Context.ProjectMembers.FirstOrDefaultAsync(x => x.ProjectId == projectId && x.UserId == targetUserId);
            if (target == null) throw new Exception("Member not Found");

            if (current.Role != "Employee") throw new Exception("Not allowed");
            if (current.Role == "Manager" && target.Role == "Admin") throw new Exception("Manager cannot Remove Admin");

            _Context.ProjectMembers.Remove(target);
        }
       
    }
}
