using SmartTaskAPI.Models.DB;

namespace SmartTaskAPI.Repository.Interface
{
    public interface ITaskRepository
    {
        Task AddAsync(TaskItem task);
        Task<IEnumerable<TaskItem>> GetByProjectIdAsync(int id);
        Task<TaskItem> GetByIdAsync(int id);

        Task<IEnumerable<TaskItem>> GetAllAsync(string userId);
    }
}
