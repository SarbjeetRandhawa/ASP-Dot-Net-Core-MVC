using Microsoft.EntityFrameworkCore;
using SmartTaskAPI.Models.DB;
using SmartTaskAPI.Models.DTO.ProjectDto;
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

        public async Task<bool> ArchiveProjectAsync(int id)
        {
            var project = await _uow.ProjectRepository.ArchiveAsync(id);
            _uow.SaveAsync();
            return true;
            
        }

        public async Task CreateAsync(ProjectDto dto, string CreatoruserId)
        {
            var role = await _uow.UserRepository.GetUserRoleAsync(CreatoruserId);
            if (role != "Admin" && role != "Manager") throw new Exception("Only Admin or Manager Can Create Project");
            var project = new Project
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

            var projectMembersList = new List<ProjectMember>();
            int CreatorProjectRoleId = role == "Admin" ? 1 : 2;

            projectMembersList.Add(new ProjectMember
            {
                ProjectId =project.Id,
                UserId = CreatoruserId,
                ProjectRoleID = CreatorProjectRoleId,
              
            });
            
            foreach (var member in dto.Members)
            {
                //if (role == "Manager" && _uow.UserRepository.GetUserRoleAsync(member.UserId).ToString() == "Admin")
                //{
                //    throw new Exception("Manager Cannot add admin");
                //}

                projectMembersList.Add(new ProjectMember
                {
                    ProjectId = project.Id,
                    UserId = member.UserId,
                    ProjectRoleID = member.Role
                });
                

            }
            await _uow.ProjectRepository.CreateProjectMemberAsync(projectMembersList);
            await _uow.SaveAsync();

        }

        public async Task DeleteProjectAsync(int id, string CurrentUserId)
        {
            string Role = _uow.UserRepository.GetUserRoleAsync(CurrentUserId).ToString() ?? string.Empty;

            await _uow.ProjectRepository.DeleteAsync(id,CurrentUserId ,Role);
            await _uow.SaveAsync();

        }

        public async Task<List<ProjectResponseDto>> GetAllProjectsAsync(string userId)
        {
            return await _uow.ProjectRepository.GetAllProjectsAsync(userId);
        }

        public async Task<ProjectDetailsResponseDto> GetProjectByIdAsync(int id)
        {
            return await _uow.ProjectRepository.GetProjectByIdAsync(id);
        }

        public async Task UpdateAsync(int id, ProjectDto dto, string CurrentUserId)
        {
            string Role = _uow.UserRepository.GetUserRoleAsync(CurrentUserId).ToString() ?? string.Empty;
            await _uow.ProjectRepository.UpdateAsync(id,dto,CurrentUserId,Role);
            await _uow.SaveAsync();
        }
    }
}
