using SmartTaskAPI.Models.DB;
using SmartTaskAPI.Models.DTO.Task;

namespace SmartTaskAPI.Repository.Interface
{
    public interface ITaskRepository
    {
        Task AddAsync(TaskItem task);
        Task<IEnumerable<TaskItem>> GetByProjectIdAsync(string userId, int id);
        Task<TaskItem> GetByIdAsync(int id);

        Task<(IEnumerable<TaskItem>, int)> GetAllAsync(string userId, QueryParams query);

        Task<TaskCountDto> GetTaskCountsAsync(string userId ,QueryParams query);
        Task UpdateTaskStatus(int taskId, int status);
    }
}
