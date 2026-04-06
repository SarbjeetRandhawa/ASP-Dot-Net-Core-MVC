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
        public async Task<IActionResult> CreateTask([FromForm] CreateTaskDto dto)
        {
            var userId = GetUserId();
             await taskService.CreateTaskAsync(dto , userId);
            return Ok("Success");
        }

        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {
            var userId = GetUserId();
            var Tasks = await taskService.GetAllTasksAsync(userId);
            return Ok(Tasks);
        }



        [HttpGet("project/{projectId}")]
        public async Task<IActionResult> GetTasksById(int projectId)
        {
            var result = await taskService.GetTaskItemsByPtojectIdAsync(projectId);
            return Ok(result);
        }



    }
}
