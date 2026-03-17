using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using SmartTaskAPI.Data;
using SmartTaskAPI.Models.DB;
using SmartTaskAPI.Models.DTO;
using System.Net.NetworkInformation;

namespace SmartTaskAPI.Repository
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly AppDbContext _Context;
        public ProjectRepository(AppDbContext context)
        {
            _Context = context;
        }

        public async Task CreateAsync(CreateProjectDto dto, string userId, string role)
        {
            if (role != "Admin" || role != "Manager") throw new Exception("Only Admin or Manager Can Create Project");
            var project = new Projects
            {
                Name = dto.Name,
                Description = dto.Description,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                Status = dto.Status,
                Icon = dto.Icon,
                colorTheme = dto.colorTheme,
                CreatedBy = userId,
            };
            await _Context.Projects.AddAsync(project);

            string ProjectCreatorRole = role == "Admin" ? "Admin" : "Manager";

            await _Context.ProjectMembers.AddAsync(new ProjectMembers
            {
                ProjectId = project.Id,
                UserId = userId,
                Role = ProjectCreatorRole,
            }); 

            foreach (var member in dto.Members) { 
                if(role == "Manager" && member.Role == "Admin")
                {
                    throw new Exception("Manager Cannot add admin");
                }
                await _Context.ProjectMembers.AddAsync(new ProjectMembers {
                    ProjectId =project.Id,
                    UserId=member.UserId,
                    Role = member.Role,
                });
            }
            
        }

        public async Task DeleteAsync(int id, string CurrentUserId)
        {
            var Project = await _Context.Projects.FindAsync(id);
            if (Project == null) throw new Exception("Project Not Found");
            
            var members  = await _Context.ProjectMembers.FirstOrDefaultAsync(x => x.Id == id && x.UserId == CurrentUserId);

            if (members == null) throw new Exception("Your are not part of this Project");

            if (members.Role != "Admin") throw new Exception("Only admin Allowed to delete Project");

            _Context.Projects.Remove(Project);
        }

        public async Task UpdateAsync(int id, CreateProjectDto dto, string CurrentUserId)
        {
            var Project = await _Context.Projects.FindAsync(id);

            if (Project == null) throw new Exception("Project Not Found");

            var members = await _Context.ProjectMembers.FirstOrDefaultAsync(x => x.Id == id && x.UserId == CurrentUserId);

            if (members.Role == "Employee") throw new Exception("Not Allowed");


            Project.Name = dto.Name;
            Project.Description = dto.Description;
            Project.StartDate = dto.StartDate;
            Project.EndDate = dto.EndDate;
            Project.Status = dto.Status;
            Project.Icon = dto.Icon;
            Project.colorTheme = dto.colorTheme;

            _Context.Projects.Update(Project);

        }

       
        
    }
}
