using Microsoft.EntityFrameworkCore;
using SmartTaskAPI.Data;
using SmartTaskAPI.Models.DB;
using SmartTaskAPI.Models.DTO;
using SmartTaskAPI.Repository.Interface;

namespace SmartTaskAPI.Repository.Implementation
{
    public class ProjectMemberRepository : IProjectMemberRepository
    {
        private readonly AppDbContext _Context;
       
        public ProjectMemberRepository(AppDbContext context)
        {
            this._Context = context;
           
        }

        public async Task AddMemberAsync(int projectId, AddMemberDto dto, string currentUserId, string adderRole, string targetRole , int ProjectRoleId)
        {
            var current = await _Context.ProjectMembers.FirstOrDefaultAsync(x => x.UserId == currentUserId && x.ProjectId == projectId);
            
            if (current == null) throw new Exception("not part of the project");

            if (adderRole == "Employee") throw new Exception("Not Allowed");

            if (adderRole == "Manager" && targetRole == "Admin") throw new Exception("Manager cannot add Admin");

            var exists = await _Context.ProjectMembers.AnyAsync(x => x.UserId == dto.UserId && x.ProjectId == projectId);

            if (exists) {
                throw new Exception("Member already added");
            }

            var member = new ProjectMember
            {
                UserId = dto.UserId,
                ProjectId = projectId,
                ProjectRoleID = ProjectRoleId,
                

            };
            await _Context.ProjectMembers.AddAsync(member);
        }
        

        public async Task<List<ProjectMemberDto>> GetAllMembersAsync(int projectId)
        {
            var members = await _Context.ProjectMembers.Where(pm =>  pm.ProjectId == projectId)
                .Include( pm => pm.User).Select(pm => new ProjectMemberDto
                {
                    UserId=pm.UserId,
                    FirstName=pm.User.FirstName,
                    LastName=pm.User.LastName,
                    Email=pm.User.Email ?? "",
                    RoleId=pm.ProjectRoleID

                }).ToListAsync();
            return members;
        }

        public async Task RemoveMemberAsync(int projectId, string targetUserId, string currentUserId, string CurrentUserRole, string targetUserRole)
        {
            var current = await _Context.ProjectMembers.FirstOrDefaultAsync(x => x.ProjectId == projectId && x.UserId == currentUserId);
            
            if (current == null)
            {
                throw new Exception("Not Part of the Project");
            }
            var target = await _Context.ProjectMembers.FirstOrDefaultAsync(x => x.ProjectId == projectId && x.UserId == targetUserId);
            if (target == null) throw new Exception("Member not Found");

            if (CurrentUserRole == "Employee") throw new Exception("Not allowed");
            if (CurrentUserRole == "Manager" && targetUserRole == "Admin") throw new Exception("Manager cannot Remove Admin");

            _Context.ProjectMembers.Remove(target);
        }
       
    }
}
