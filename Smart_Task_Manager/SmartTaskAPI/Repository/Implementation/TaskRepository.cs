using Microsoft.EntityFrameworkCore;
using SmartTaskAPI.Data;
using SmartTaskAPI.Models.DB;
using SmartTaskAPI.Repository.Interface;

namespace SmartTaskAPI.Repository.Implementation
{
    public class TaskRepository : ITaskRepository
    {
        private readonly AppDbContext _context;

        public TaskRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<TaskItem> AddAsync(TaskItem task)
        {
            await _context.Tasks.AddAsync(task);
            return task;
        }

        public async Task<IEnumerable<TaskItem>> GetByProjectIdAsync(int id)
        {
            return await _context.Tasks.Where(t => t.ProjectId == id).Include(t => t.Attachments).ToListAsync();
        }

        public async Task<TaskItem> GetByIdAsync(int id) {
            return await _context.Tasks.Include(t => t.Attachments).FirstOrDefaultAsync(t => t.Id == id);
        }
    }
}
