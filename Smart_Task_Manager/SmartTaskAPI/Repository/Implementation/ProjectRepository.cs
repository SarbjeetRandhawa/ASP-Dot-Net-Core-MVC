using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using SmartTaskAPI.Data;
using SmartTaskAPI.Models.DB;
using SmartTaskAPI.Models.DTO.ProjectDto;
using SmartTaskAPI.Repository.Interface;
using System.Net.NetworkInformation;

namespace SmartTaskAPI.Repository.Implementation
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly AppDbContext _Context;
        public ProjectRepository(AppDbContext context)
        {
            _Context = context;
        }

        public async Task CreateProjectAsync(Project project)
        {

            await _Context.Projects.AddAsync(project);

        }
        public async Task CreateProjectMemberAsync(List<ProjectMember> projectMember)
        {
            await _Context.ProjectMembers.AddRangeAsync(projectMember);
        }



        public async Task DeleteAsync(int id, string CurrentUserId, string Role)
        {
            var Project = await _Context.Projects.FindAsync(id);
            if (Project == null) throw new Exception("Project Not Found");

            var members = await _Context.ProjectMembers.FirstOrDefaultAsync(x => x.Id == id && x.UserId == CurrentUserId);

            if (members == null) throw new Exception("Your are not part of this Project");

            if (Role.ToString() != "Admin") throw new Exception("Only admin Allowed to delete Project");

            _Context.Projects.Remove(Project);
        }

        public async Task<List<ProjectResponseDto>> GetAllProjectsAsync(string userId)
        {
            var Projects = await _Context.Projects.Where(p => p.Members.Any(m => m.UserId == userId)).Select(x => new ProjectResponseDto
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
                StartDate = x.StartDate,
                Members = x.Members.Select(m => new  ProjectMemberResponseDto
                { 

                    UserId = m.UserId,
                    FirstName = m.User.FirstName,
                    LastName = m.User.LastName,
                   

                }).ToList(),
                EndDate = x.EndDate,
                colorTheme = x.colorTheme,
                Status = x.Status,
                Icon = x.Icon

            }).ToListAsync();

            return Projects;
        }

        public async Task<ProjectDetailsResponseDto> GetProjectByIdAsync(int id)
        {
            var Projects = await _Context.Projects.Where(p => p.Id == id).Select(x => new ProjectDetailsResponseDto
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
                StartDate = x.StartDate,
                CreatedAt = x.CreatedAt,
                CreatedBy = _Context.Users.Where(u => u.Id == x.CreatedBy).Select(u => u.FirstName + " " + u.LastName).FirstOrDefault(),
                Members = x.Members.Select(m => new ProjectDetailsMemberResponseDto
                {

                    UserId = m.UserId,
                    FirstName = m.User.FirstName,
                    LastName = m.User.LastName,

                    Email = m.User.Email,
                    Role = m.Role.Name


                }).ToList(),
                EndDate = x.EndDate,
                colorTheme = x.colorTheme,
                Status = x.Status,
                Icon = x.Icon

            }).FirstOrDefaultAsync();

            return Projects;
        }

        public async Task UpdateAsync(int id, ProjectDto dto, string CurrentUserId, string Role)
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
