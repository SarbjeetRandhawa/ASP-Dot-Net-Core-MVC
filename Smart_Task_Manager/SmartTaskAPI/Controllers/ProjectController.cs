using Microsoft.AspNetCore.Mvc;
using SmartTaskAPI.Models.DTO;
using SmartTaskAPI.UnitOfWork;
using System.Security.Claims;

namespace SmartTaskAPI.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class ProjectController : Controller
    {
        private readonly IUnitOfWork _uow;

        public ProjectController(IUnitOfWork uow) { 
            this._uow = uow;
        }

        private string GetUserId()
        {
            return User.FindFirst("id")?.Value;
        }
        private string GetUserRole() {
            return User.FindFirst(ClaimTypes.Role)?.Value;
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateProjectDto dto)
        {

            await _uow.ProjectRepository.CreateAsync(dto , GetUserId() , GetUserRole());
            return Ok("Project Created");
        }
        [HttpPut]
        public async Task<IActionResult> Update(int id, CreateProjectDto dto) { 
            await _uow.ProjectRepository.UpdateAsync(id, dto , GetUserId() );
            return Ok("Project Updated");
        }

        [HttpDelete("id")]
        public async Task<IActionResult> Delete(int id)
        {
            await _uow.ProjectRepository.DeleteAsync(id, GetUserRole());
            return Ok("Project Deleted");
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _uow.UserRepository.GetAllAsync();
            return Ok(users);
        }
        [HttpPost("{projectId}/members")]
        public async Task<IActionResult> AddMember(int projectId, AddMemberDto dto)
        {
            await _uow.ProjectMemberRepository.AddMemberAsync(projectId, dto , GetUserId() );
            return Ok("Member Added");
        }

        [HttpGet("{projectId}/members")]
        public async Task<IActionResult> GetMember(int projectId) {
            var members = await _uow.ProjectMemberRepository.GetAllMembersAsync(projectId);
            return Ok(members);
        }
    }
}
