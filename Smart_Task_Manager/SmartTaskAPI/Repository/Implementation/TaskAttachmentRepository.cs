using SmartTaskAPI.Data;
using SmartTaskAPI.Models.DB;
using SmartTaskAPI.Repository.Interface;

namespace SmartTaskAPI.Repository.Implementation
{
    public class TaskAttachmentRepository : ITaskAttachmentRepository
    {
        private readonly AppDbContext _context;

        public TaskAttachmentRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(TaskAttachment attachement)
        {
            await _context.TaskAttachments.AddAsync(attachement);
        }
    }
}
