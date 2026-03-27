using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartTaskAPI.Models.DTO;
using SmartTaskAPI.Services.Interfaces;
using SmartTaskAPI.UnitOfWork;
using System.Security.Claims;

namespace SmartTaskAPI.Controllers
{
    [ApiController]
    [Route("api/[Controller]")] 
    public class ProjectController : Controller
    {
        private readonly IProjectService _projectService;
        private readonly IProjectMemberService _projectMemberService;
        private readonly IProjectRoleService _projectRoleService;

        public ProjectController(IProjectService projectService , IProjectMemberService projectMemberService, IProjectRoleService projectRoleService)
        {
           _projectService = projectService;
            _projectRoleService = projectRoleService;
            _projectMemberService = projectMemberService;
        }

        private string GetUserId()
        {
            return User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }
        private string GetUserRole()
        {
            return User.FindFirst(ClaimTypes.Role)?.Value; 
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProjects()
        {
            var userId = GetUserId();
            var Projects =await _projectService.GetAllProjectsAsync(userId);
            return Ok(Projects);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create(ProjectDto dto)
        {
           
            var userId = GetUserId();

            //Console.WriteLine(userId);
            await _projectService.CreateAsync(dto, userId);

            return Ok("Project Created");


        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, ProjectDto dto)
        {
           
            await _projectService.UpdateAsync(id,dto, GetUserId());

            return Ok("Project Updated");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _projectService.DeleteProjectAsync(id, GetUserRole());

            return Ok("Project Deleted");
        }




        [HttpPost("{projectId , ProjectRoleId}/members")]
        public async Task<IActionResult> AddMember(int projectId, AddMemberDto dto , int ProjectRoleId)
        {
            
            await _projectMemberService.AddMemberAsync(projectId,dto, GetUserId() , ProjectRoleId);

            return Ok("Member Added");
        }

        [HttpGet("{projectId}/members")]
        public async Task<IActionResult> GetMember(int projectId)
        {
            var members = await _projectMemberService.GetAllMembersAsync(projectId);
            

            return Ok(members);
        }

        [HttpDelete("{projectId}/members/{userId}")]
        public async Task<IActionResult> RemoveMember(int projectId, string userId)
        {
            await _projectMemberService.RemoveMemberAsync(projectId, userId, GetUserId());
         
            return Ok("member Removed");
        }


        [HttpGet("ProjectRoles")]
        public async Task<IActionResult> GetAll()
        {
            var ProjectRoles = await _projectRoleService.GetAllAsync();
            return Ok(ProjectRoles);
        }

        [HttpGet("/ProjectRoles/{id}")]
        public async Task<IActionResult> GetProjectRoleById(int id)
        {
            var ProjectRole = await _projectRoleService.GetByIdAsync(id);
            return Ok(ProjectRole);
        }
    }
}
