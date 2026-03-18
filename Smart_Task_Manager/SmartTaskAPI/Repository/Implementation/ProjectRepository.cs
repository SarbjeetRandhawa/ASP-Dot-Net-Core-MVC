using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using SmartTaskAPI.Data;
using SmartTaskAPI.Models.DB;
using SmartTaskAPI.Models.DTO;
using SmartTaskAPI.Repository.Interface;
using System.Net.NetworkInformation;

namespace SmartTaskAPI.Repository.Implementation
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly AppDbContext _Context;
        public ProjectRepository(AppDbContext context )
        {
            _Context = context;
        }

        public async Task CreateProjectAsync(Projects project)
        {
                
            await _Context.Projects.AddAsync(project);
            
        }
        public async Task CreateProjectMemberAsync(ProjectMembers projectMember)
        {
            await _Context.ProjectMembers.AddAsync(projectMember);
        }



        public async Task DeleteAsync(int id, string CurrentUserId , string Role)
        {
            var Project = await _Context.Projects.FindAsync(id);
            if (Project == null) throw new Exception("Project Not Found");
            
            var members  = await _Context.ProjectMembers.FirstOrDefaultAsync(x => x.Id == id && x.UserId == CurrentUserId);

            if (members == null) throw new Exception("Your are not part of this Project");

            if (Role.ToString() != "Admin") throw new Exception("Only admin Allowed to delete Project");

            _Context.Projects.Remove(Project);
        }

        public async Task UpdateAsync(int id, CreateProjectDto dto, string CurrentUserId , string Role)
        {
            var Project = await _Context.Projects.FindAsync(id);


            if (Project == null) throw new Exception("Project Not Found");

            var members = await _Context.ProjectMembers.FirstOrDefaultAsync(x => x.Id == id && x.UserId == CurrentUserId);
  

            if (Role == "Employee") throw new Exception("Not Allowed");


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
