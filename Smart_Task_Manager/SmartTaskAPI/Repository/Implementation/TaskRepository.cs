using Microsoft.EntityFrameworkCore;
using SmartTaskAPI.Data;
using SmartTaskAPI.Models.DB;
using SmartTaskAPI.Models.DTO.Task;
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

        public async Task<IEnumerable<TaskItem>> GetByProjectIdAsync(string userId, int id)
        {
            return await _context.Tasks.Include(t => t.AssignedToUser)
                .Include(t => t.CreatedByUser)
                .Where(t =>  t.ProjectId == id).ToListAsync();
        }

        public async Task<TaskItem> GetByIdAsync(int id)
        {
            return await _context.Tasks
                .Include(t=> t.Project)
                .Include(t => t.Attachments)
                .Include(t => t.AssignedToUser)
                .Include(t => t.CreatedByUser)
                .FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<(IEnumerable<TaskItem>, int)> GetAllAsync(string userId, QueryParams query)
        {
            var now = DateTime.UtcNow;
            await _context.Tasks.Where(t => t.DueDate < now && t.Status != 1).ExecuteUpdateAsync(t => t.SetProperty(x => x.Status ,3));

            var projectIds = await _context.ProjectMembers
                .Where(pm => pm.UserId == userId)
                .Select(pm => pm.ProjectId)
                .ToListAsync();

            var TaskQuery = _context.Tasks
                .Include(t => t.Project)
                .Include(t => t.AssignedToUser)
                .Include(t => t.CreatedByUser)
                .Where(t => t.AssignedToUserId == userId || t.CreatedByUserId == userId || projectIds.Contains(t.ProjectId))

       ;

            if (query.MyTasks)
            {
                TaskQuery = TaskQuery.Where(t => t.AssignedToUserId == userId || t.CreatedByUserId == userId);
            }


            if (query.Status.HasValue)
            {
                TaskQuery = TaskQuery.Where(t => t.Status == query.Status);
            }
            if (query.Priority.HasValue)
            {
                TaskQuery = TaskQuery.Where(t => t.Priority == query.Priority);
            }
            if (!string.IsNullOrEmpty(query.Search))
            {
                TaskQuery = TaskQuery.Where(t => t.Title.Contains(query.Search));
            }

            if (query.Overdue)
            {
                TaskQuery = TaskQuery.Where(t => t.DueDate < DateTime.UtcNow && t.Status != 1);
            }

            var totalCount = await TaskQuery.CountAsync();
            var tasks = await TaskQuery.OrderByDescending(t => t.CreatedAt).Skip((query.PageNumber - 1) * query.PageSize).Take(query.PageSize).ToListAsync();

            return (tasks, totalCount);
        }

        public async Task<TaskCountDto> GetTaskCountsAsync(string userId, QueryParams query)
        {
            var projectIds = await _context.ProjectMembers
                .Where(pm => pm.UserId == userId)
                .Select(pm => pm.ProjectId)
                .ToListAsync();
            var baseQuery = _context.Tasks.Where(t => t.AssignedToUserId == userId || t.CreatedByUserId == userId || projectIds.Contains(t.ProjectId));

            if (!string.IsNullOrEmpty(query.Search))
            {

                baseQuery = baseQuery.Where(t => (t.Title.Contains(query.Search) || t.AssignedToUser.FirstName.Contains(query.Search)));
            }

            return new TaskCountDto
            {
                TotalTasks = await baseQuery.CountAsync(),
                MyTasks = await baseQuery.Where(t => t.AssignedToUserId == userId || t.CreatedByUserId == userId).CountAsync(),
                ToDo = await baseQuery.Where(t => t.Status == 0).CountAsync(),
                Done = await baseQuery.Where(t => t.Status == 1).CountAsync(),
                InProgress = await baseQuery.Where(t => t.Status == 2).CountAsync(),
                OverDue = await baseQuery.Where(t => t.DueDate < DateTime.UtcNow && t.Status != 1).CountAsync()
            };

        }
    }
}
