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

        public async Task AddAsync(TaskItem task)
        {
            await _context.Tasks.AddAsync(task);
            
        }

        public async Task<IEnumerable<TaskItem>> GetByProjectIdAsync(int id)
        {
            return await _context.Tasks.Where(t => t.ProjectId == id).Include(t => t.Attachments).ToListAsync();
        }

        public async Task<TaskItem> GetByIdAsync(int id) {
            return await _context.Tasks.Include(t => t.Attachments).FirstOrDefaultAsync(t => t.Id == id);
        }

        public async  Task<IEnumerable<TaskItem>> GetAllAsync(string userId)
        {
            var projectIds = await _context.ProjectMembers.Where(pm=> pm.UserId == userId).Select(pm => pm.ProjectId).ToListAsync();

            return await _context.Tasks.Include(t => t.Project).Include(t=> t.AssignedToUser).Include(t => t.CreatedByUser).Where(t => t.AssignedToUserId == userId || projectIds.Contains(t.ProjectId)).ToListAsync(); ;
        }
    }
}
