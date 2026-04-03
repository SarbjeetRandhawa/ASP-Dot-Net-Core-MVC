using SmartTaskAPI.Models.DB;
using SmartTaskAPI.Models.DTO.Task;

namespace SmartTaskAPI.Services.Interfaces
{
    public interface ITaskService
    {
        Task CreateTaskAsync(CreateTaskDto dto, string userId);
        Task<IEnumerable<TaskItem>> GetTaskItemsByPtojectIdAsync(int projectId);
    }
}
         