using SmartTaskAPI.Models.DB;
using SmartTaskAPI.Models.DTO.Task;

namespace SmartTaskAPI.Services.Interfaces
{
    public interface ITaskService
    {
        Task CreateTaskAsync(CreateTaskDto dto, string userId);
        Task<IEnumerable<TaskDto>> GetTaskItemsByPtojectIdAsync(string userId, int projectId);
        Task<TaskResponseDetailDto> GetTaskById(int TaskId);
        Task<object> GetAllTasksAsync(string userId, QueryParams query);

        Task<TaskCountDto> GetTaskCountsAsync(string userId, QueryParams query);
        Task<bool> UpdateTaskStatus(UpdateTaskStatusDto dto);



    }
}
         