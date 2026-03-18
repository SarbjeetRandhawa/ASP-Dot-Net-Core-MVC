using Microsoft.EntityFrameworkCore;
using SmartTaskAPI.Models.DB;
using SmartTaskAPI.Models.DTO;
using SmartTaskAPI.Services.Interfaces;
using SmartTaskAPI.UnitOfWork;

namespace SmartTaskAPI.Services.Implementation
{
    public class ProjectService : IProjectService
    {
        private readonly IUnitOfWork _uow;

        public ProjectService(IUnitOfWork uow)
        {
            _uow = uow;
        }
        public async Task CreateAsync(CreateProjectDto dto, string CreatoruserId, string role)
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
                CreatedBy = CreatoruserId,
            };
            await _uow.ProjectRepository.CreateProjectAsync(project);
            await _uow.SaveAsync();



            var CreatorProjectMember = new ProjectMembers
            {
                ProjectId = project.Id,
                UserId = CreatoruserId,
                ProjectId = ,
            };

            await _uow.ProjectRepository.CreateProjectMemberAsync(CreatorProjectMember);
            await _uow.SaveAsync();


            foreach (var member in dto.Members)
            {
                if (role == "Manager" && member.Role == "Admin")
                {
                    throw new Exception("Manager Cannot add admin");
                }
                var projectMembers  = new ProjectMembers
                {
                    ProjectId = project.Id,
                    UserId = member.UserId,
                    
                };
                await _uow.ProjectRepository.CreateProjectMemberAsync(projectMembers);
                await _uow.SaveAsync();

            }

        }

        public async Task DeleteProjectAsync(int id, string CurrentUserId)
        {
            string Role = _uow.UserRepository.GetUserRoleAsync(CurrentUserId).ToString() ?? string.Empty;

            await _uow.ProjectRepository.DeleteAsync(id,CurrentUserId ,Role);
            await _uow.SaveAsync();

        }

        public async Task UpdateAsync(int id, CreateProjectDto dto, string CurrentUserId)
        {
            string Role = _uow.UserRepository.GetUserRoleAsync(CurrentUserId).ToString() ?? string.Empty;
            await _uow.ProjectRepository.UpdateAsync(id,dto,CurrentUserId,Role);
            await _uow.SaveAsync();
        }
    }
}
