using SmartTaskAPI.Models.DB;

namespace SmartTaskAPI.Repository.Interface
{
    public interface ITaskRepository
    {
        Task<TaskItem> AddAsync(TaskItem task);
        Task<IEnumerable<TaskItem>> GetByProjectIdAsync(int id);
        Task<TaskItem> GetByIdAsync(int id);
    }
}
