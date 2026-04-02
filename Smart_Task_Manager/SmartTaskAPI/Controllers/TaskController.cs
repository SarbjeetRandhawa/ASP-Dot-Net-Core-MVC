using Microsoft.AspNetCore.Mvc;
using SmartTaskAPI.Models.DTO.Task;
using SmartTaskAPI.Services.Interfaces;
using System.Security.Claims;

namespace SmartTaskAPI.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]

    public class TaskController : Controller
    {

        private readonly ITaskService taskService;

        public TaskController(ITaskService taskService)
        {
            this.taskService = taskService;
        }

        private string GetUserId()
        {
            return User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }

        [HttpPost]
        public async Task<IActionResult> CreateTask(CreateTaskDto dto)
        {
            var userId = GetUserId();
            var result = await taskService.CreateTaskAsync(dto , userId);
            return Ok(result);
        }
        [HttpGet("project/{projectId}")]
        public async Task<IActionResult> GetTasks(int projectId)
        {
            var result = await taskService.GetTaskItemsByPtojectIdAsync(projectId);
            return Ok(result);
        }



    }
}
